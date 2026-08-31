---
title: "Building a Zero-Downtime Deploy Pipeline with GitHub Actions"
date: 2024-07-20
description: "How I wired up a blue-green deployment pipeline using GitHub Actions, Docker, and a $6/mo VPS, no Kubernetes required."
category: teknologi
tags: [github-actions, docker, nginx, ci-cd, vps]
draft: false
---

## The Problem

Rolling deploys on a single VPS are a solved problem, until you've been burned by
a mid-deploy nginx reload that drops in-flight connections. This post documents the
exact pipeline I use across several hobby projects to get **true zero-downtime deploys**
without the operational overhead of Kubernetes.

## Architecture Overview

```
┌─────────────────────────────────┐
│         GitHub Actions          │
│  push → build → push image      │
│  → SSH → swap containers        │
└───────────────┬─────────────────┘
                │ SSH
                ▼
┌─────────────────────────────────┐
│          VPS (Ubuntu 24)        │
│  nginx (upstream proxy)         │
│  ├── container:blue  :3001      │
│  └── container:green :3002      │
└─────────────────────────────────┘
```

The trick is **nginx's `upstream` block**: it lets you hot-swap which container
handles traffic without reloading the main config.

## The Workflow

### 1. GitHub Actions: Build & Push

```yaml
# .github/workflows/deploy.yml
name: deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build & push image
        run: |
          echo "${{ secrets.REGISTRY_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          docker build -t ghcr.io/${{ github.repository }}:${{ github.sha }} .
          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host:     ${{ secrets.VPS_HOST }}
          username: deploy
          key:      ${{ secrets.VPS_KEY }}
          script:   /opt/scripts/swap.sh ${{ github.sha }}
```

### 2. The Swap Script

```bash
#!/usr/bin/env bash
# /opt/scripts/swap.sh
set -euo pipefail

SHA="$1"
IMAGE="ghcr.io/yourusername/yourapp:${SHA}"

# Determine idle slot
ACTIVE=$(cat /run/active-slot 2>/dev/null || echo "blue")
IDLE=$([ "$ACTIVE" = "blue" ] && echo "green" || echo "blue")
PORT=$([ "$IDLE" = "blue" ] && echo "3001" || echo "3002")

echo "Deploying $SHA to $IDLE slot on :$PORT"

docker pull "$IMAGE"
docker stop "app-${IDLE}" 2>/dev/null || true
docker rm   "app-${IDLE}" 2>/dev/null || true

docker run -d \
  --name "app-${IDLE}" \
  --network app-net \
  -p "${PORT}:3000" \
  --env-file /opt/app/.env \
  --restart unless-stopped \
  "$IMAGE"

# Health check before swapping traffic
for i in {1..10}; do
  if curl -sf "http://localhost:${PORT}/health"; then
    break
  fi
  sleep 2
done

# Atomic nginx upstream swap
sed -i "s/server localhost:[0-9]*/server localhost:${PORT}/" /etc/nginx/conf.d/upstream.conf
nginx -t && nginx -s reload

echo "$IDLE" > /run/active-slot
echo "✓ Traffic now on $IDLE slot"
```

## nginx Configuration

```nginx
# /etc/nginx/conf.d/upstream.conf
upstream app {
    server localhost:3001;  # swap.sh edits this line
    keepalive 32;
}
```

```nginx
# /etc/nginx/sites-enabled/app
server {
    listen 443 ssl http2;
    server_name example.com;

    location / {
        proxy_pass         http://app;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade    $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host       $host;
    }
}
```

## Results

After running this for 6 months across 4 projects:

- **Deploy time**: ~45s from push to live
- **Downtime**: 0ms (verified with [oha](https://github.com/hatoo/oha) during deploys)
- **Rollback**: `swap.sh <previous-sha>`, done in 30s

The whole thing is ~80 lines of bash and a YAML file. No Helm, no ArgoCD, no weekend
learning Kubernetes, just `nginx -s reload` doing exactly what it says.

> If your scale doesn't justify Kubernetes, don't run Kubernetes.
