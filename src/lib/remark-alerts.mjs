// src/lib/remark-alerts.mjs
// Converts [!NOTE], [!TIP], [!WARNING], [!CAUTION] in blockquotes to styled alerts
import { visit } from "unist-util-visit";

const ALERTS = {
  "note":    { cls: "alert-note",    label: "NOTE" },
  "tip":     { cls: "alert-tip",     label: "TIP" },
  "warning": { cls: "alert-warning", label: "WARNING" },
  "caution": { cls: "alert-danger",  label: "CAUTION" },
  "danger":  { cls: "alert-danger",  label: "DANGER" },
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
        value: alert.label + " ",
      });
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.className = `alert-blockquote ${alert.cls}`;
    });
  };
}
