import type { Dict } from "@vee-ui/util";

export default (options: Dict) => ({
  slots: {
    root: "mb-3 lg:mb-6 -mx-1 lg:mx-0",
    list: "flex flex-col gap-3",
    item: "relative",
    link: "group text-sm flex items-center gap-1.5 focus-visible:outline-[var(--ui-primary)]",
    linkLeading: "rounded-[calc(var(--ui-radius)*1.5)] p-1 inline-flex ring-inset ring",
    linkLeadingIcon: "size-4 shrink-0",
    linkLabel: "truncate",
    linkLabelExternalIcon: "size-3 absolute top-0 text-[var(--ui-text-dimmed)]",
  },
  variants: {
    active: {
      true: {
        link: "text-[var(--ui-primary)] font-semibold",
        linkLeading: "bg-[var(--ui-primary)] ring-[var(--ui-primary)] text-[var(--ui-bg)]",
      },
      false: {
        link: [
          "text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] font-medium",
          options.theme.transitions && "transition-colors",
        ],
        linkLeading: [
          "bg-[var(--ui-bg-elevated)]/50 ring-[var(--ui-border-accented)] text-[var(--ui-text-dimmed)] group-hover:bg-[var(--ui-primary)] group-hover:ring-[var(--ui-primary)] group-hover:text-[var(--ui-bg)]",
          options.theme.transitions && "transition",
        ],
      },
    },
  },
});
