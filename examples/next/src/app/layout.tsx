import "../styles.css";

import { en } from "@veehance/core/locale";
import { cx } from "@veehance/core/utils";

import { GeistMono as mono } from "geist/font/mono";
import { GeistSans as sans } from "geist/font/sans";
import type { ReactNode } from "react";

import { UApp } from "#build/ui/components";

async function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={en.code}
      dir={en.dir}
      className={cx(sans.variable, mono.variable)}
      suppressHydrationWarning
    >
      <body className="isolate">
        <UApp locale={en}>{children}</UApp>
      </body>
    </html>
  );
}

export default Layout;
