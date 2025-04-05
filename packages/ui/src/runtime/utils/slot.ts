import type { VNode } from "vue";

import { isString } from "./assertion";

export function getSlotChildrenText(children: VNode[]): string {
  return (
    children
      // eslint-disable-next-line array-callback-return
      .map((node: any) => {
        if (!node.children || isString(node.children))
          return node.children || "";
        else if (Array.isArray(node.children))
          return getSlotChildrenText(node.children);
        else if (node.children.default)
          return getSlotChildrenText(node.children.default());
      })
      .join("")
  );
}
