import "../styles.css";

import { cn } from "@veehance/core/utils";

import { GeistMono as mono } from "geist/font/mono";
import { GeistSans as sans } from "geist/font/sans";
import type { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, mono.variable, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}

export default Layout;
