import { en } from "@veehance/core/locale";

import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { UApp } from "#build/ui/components";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.bunny.net" },
      {
        rel: "stylesheet",
        href: "https://fonts.bunny.net/css?family=geist:400,500,600,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.bunny.net/css?family=geist-mono:400,500,600,700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg" },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html dir={en.dir} lang={en.code} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="isolate">
        <UApp locale={en}>{children}</UApp>

        <TanStackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
