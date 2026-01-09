import type { RouteLocationRaw, RouterLinkProps } from "vue-router";

export interface NuxtLinkProps extends Omit<RouterLinkProps, "to"> {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: RouteLocationRaw;
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: NuxtLinkProps["to"];
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | (string & {}) | null;
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?:
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "sponsored"
    | "ugc"
    | (string & {})
    | null;
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean;
  /**
   * A class to apply to links that have been prefetched.
   */
  prefetchedClass?: string;
  /**
   * When enabled will prefetch middleware, layouts and payloads of links in the viewport.
   */
  prefetch?: boolean;
  /**
   * Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
   */
  prefetchOn?:
    | "visibility"
    | "interaction"
    | Partial<{
        visibility: boolean;
        interaction: boolean;
      }>;
  /**
   * Escape hatch to disable `prefetch` attribute.
   */
  noPrefetch?: boolean;
  /**
   * An option to either add or remove trailing slashes in the `href` for this specific link.
   * Overrides the global `trailingSlash` option if provided.
   */
  trailingSlash?: "append" | "remove";
}

export type LinkPropsKeys =
  | "to"
  | "href"
  | "target"
  | "rel"
  | "noRel"
  | "external"
  | "prefetch"
  | "prefetchOn"
  | "prefetchedClass"
  | "noPrefetch"
  | "trailingSlash"
  | "replace"
  | "ariaCurrentValue"
  | "active"
  | "activeClass"
  | "exact"
  | "exactQuery"
  | "exactHash"
  | "inactiveClass"
  | "download"
  | "ping"
  | "referrerpolicy"
  | "hreflang"
  | "media";
