"use client";

import { createHead, UnheadProvider } from "@unhead/react/client";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

export type HeadProviderProps = {
  children: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/* context                                                                    */
/* -------------------------------------------------------------------------- */

export const head: ReturnType<typeof createHead> = createHead();

/* -------------------------------------------------------------------------- */
/* provider                                                                   */
/* -------------------------------------------------------------------------- */

export function HeadProvider({ children }: HeadProviderProps) {
  return <UnheadProvider head={head}>{children}</UnheadProvider>;
}
