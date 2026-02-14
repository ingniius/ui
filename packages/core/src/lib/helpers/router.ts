import type { Router, RouterKind } from "../types";

export function defineRouter(path: string, router?: Router, meta?: string) {
  const kind = resolveRouter(router);
  return withSuffix(path, kind === "meta" ? (meta ?? "router") : kind);
}

export function resolveRouter(router?: Router): RouterKind {
  if (router === null) return "meta";
  if (router === "inertia") return "inertia";
  if (router === "tanstack") return "tanstack";
  if (router === true) return "router";
  return "base";
}

function withSuffix(path: string, segment: string) {
  return segment === "router" ? path : `${path}/${segment}`;
}
