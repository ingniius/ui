import type { Dict } from "@vee-ui/util/types";

export default (options: Dict) => ({
  slots: {
    root: ["relative z-50", options.theme.transitions && "transition-colors"],
    container: "flex items-center justify-between gap-3 h-12",
    left: "hidden lg:flex-1 lg:flex lg:items-center",
    center: "flex items-center gap-1.5 min-w-0",
    right: "lg:flex-1 flex items-center justify-end",
    icon: "size-5 shrink-0 text-[var(--ui-bg)] pointer-events-none",
    title: "text-sm text-[var(--ui-bg)] font-medium truncate",
    actions: "flex gap-1.5 shrink-0 isolate",
    close: "text-[var(--ui-bg)]",
  },
  variants: {
    color: {
      ...Object.fromEntries(
        (options.theme.colors || []).map((color: string) => [
          color,
          { root: `bg-[var(--ui-${color})]`, close: `hover:bg-[var(--ui-${color})]/90` },
        ]),
      ),
      neutral: {
        root: "bg-[var(--ui-bg-inverted)]",
        close: "hover:bg-[var(--ui-bg-inverted)]/95",
      },
    },
    to: {
      true: "",
    },
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      to: true,
      class: { root: `hover:bg-[var(--ui-${color})]/90` },
    })),
    {
      color: "neutral",
      to: true,
      class: { root: "hover:bg-[var(--ui-bg-inverted)]/95" },
    },
  ],
});
