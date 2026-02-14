import { UContainer, UIcon, UImage, UMain } from "#build/ui/components";

import type { Route } from "./+types/index";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Veehance UI" }];
}

export default function Home() {
  return (
    <UMain className="flex min-h-screen flex-col items-center justify-center">
      <UContainer className="flex flex-col items-center justify-center gap-8 lg:grow">
        <div className="flex gap-2">
          <UImage
            src="https://logo.svgcdn.com/logos/react.png"
            alt="Framework"
            height={64}
            width={64}
          />
        </div>
        <h1 className="font-bold text-5xl md:text-7xl">Veehance UI</h1>
        <div className="flex gap-2">
          <div className="size-8 rounded-xs border border-default bg-primary"></div>
          <div className="size-8 rounded-xs border border-default bg-secondary"></div>
          <div className="size-8 rounded-xs border border-default bg-default"></div>
          <div className="size-8 rounded-xs border border-default bg-muted"></div>
          <div className="size-8 rounded-xs border border-default bg-elevated"></div>
          <div className="size-8 rounded-xs border border-default bg-accented"></div>
          <div className="size-8 rounded-xs border border-default bg-inverted"></div>
          <div className="size-8 rounded-xs border border-default bg-success"></div>
          <div className="size-8 rounded-xs border border-default bg-info"></div>
          <div className="size-8 rounded-xs border border-default bg-warning"></div>
          <div className="size-8 rounded-xs border border-default bg-error"></div>
        </div>
        <div className="flex gap-2">
          <span className="text-dimmed">Dimmed</span>
          <span className="text-muted">Muted</span>
          <span className="text-toned">Toned</span>
          <span className="text-default">Default</span>
          <span className="text-highlighted">Highlighted</span>
        </div>
        <div className="flex gap-2">
          <UIcon name="dark" className="size-6" />
          <UIcon name="light" className="size-6" />
          <UIcon name="system" className="size-6" />
          <UIcon name="user" className="size-6" />
        </div>
      </UContainer>
    </UMain>
  );
}
