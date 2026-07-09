// src/lib/remark-alerts.mjs
// Converts [!NOTE], [!TIP], [!WARNING], [!CAUTION] in blockquotes to styled alerts
import { visit } from "unist-util-visit";

const ALERTS = {
  "note":    { cls: "alert-note",    icon: "ℹ" },
  "tip":     { cls: "alert-tip",     icon: "💡" },
  "warning": { cls: "alert-warning", icon: "⚠" },
  "caution": { cls: "alert-danger",  icon: "🔥" },
  "danger":  { cls: "alert-danger",  icon: "🔥" },
};

const RE = /^\s*\[!(NOTE|TIP|WARNING|CAUTION|DANGER)\]\s*/i;

export default function remarkAlerts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      if (!node.children?.length) return;
      const first = node.children[0];
      if (first?.type !== "paragraph" || !first.children?.length) return;
      const textNode = first.children[0];
      if (textNode?.type !== "text") return;
      const match = textNode.value.match(RE);
      if (!match) return;
      const key = match[1].toLowerCase();
      const alert = ALERTS[key];
      if (!alert) return;
      textNode.value = textNode.value.replace(RE, "");
      first.children.unshift({
        type: "text",
        value: alert.icon + " ",
      });
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.className = `alert-blockquote ${alert.cls}`;
    });
  };
}
