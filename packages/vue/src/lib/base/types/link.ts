export interface BaseLinkProps {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: string;
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: string;
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
}
