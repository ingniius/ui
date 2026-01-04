import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [{ title: "Veehance UI" }],
  }),
});

function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 opacity-100 starting:opacity-0 transition-opacity duration-750 lg:grow">
        <h1 className="font-bold text-5xl md:text-7xl">Veehance UI</h1>
        <div className="flex gap-2">
          <div className="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg)"></div>
          <div className="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-muted)"></div>
          <div className="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-elevated)"></div>
          <div className="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-accented)"></div>
          <div className="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-inverted)"></div>
        </div>
        <div className="flex gap-2">
          <span className="text-(--ui-text-dimmed)">Dimmed</span>
          <span className="text-(--ui-text-muted)">Muted</span>
          <span className="text-(--ui-text-toned)">Toned</span>
          <span className="text-(--ui-text)">Default</span>
          <span className="text-(--ui-text-highlighted)">Highlighted</span>
        </div>
      </div>
    </main>
  );
}
