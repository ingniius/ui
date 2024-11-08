import type { Dict } from "@vee-ui/util";

export default (options: Dict) => ({
  slots: {
    root: "flex flex-col gap-3",
    title: "text-sm font-semibold flex items-center gap-1.5",
    list: "flex flex-col gap-2",
    item: "relative",
    link: "group text-sm flex items-center gap-1.5 focus-visible:outline-[var(--ui-primary)]",
    linkLeadingIcon: "size-5 shrink-0",
    linkLabel: "truncate",
    linkLabelExternalIcon: "size-3 absolute top-0 text-[var(--ui-text-dimmed)]",
  },
  variants: {
    active: {
      true: {
        link: "text-[var(--ui-primary)] font-medium",
      },
      false: {
        link: [
          "text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]",
          options.theme.transitions && "transition-colors",
        ],
      },
    },
  },
});
