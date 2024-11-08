import { str } from "@vee-ui/util";

export const getSlotChildrenText = (children: any) =>
  children
    .map((node: any) => {
      if (!node.children || str(node.children)) return node.children || "";
      else if (Array.isArray(node.children)) return getSlotChildrenText(node.children);
      else if (node.children.default) return getSlotChildrenText(node.children.default());
    })
    .join("");
