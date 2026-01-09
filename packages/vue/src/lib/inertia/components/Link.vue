<script lang="ts">
import theme from "#build/theme/link";

import type { ClassValue } from "@veehance/core/types";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "../../types/html";
import type { InertiaLinkProps } from "../types/link";

export interface LinkProps
  extends Partial<Omit<InertiaLinkProps, "href" | "onClick">>,
    /** @vue-ignore */ Omit<ButtonHTMLAttributes, "type" | "disabled">,
    /** @vue-ignore */ Omit<
      AnchorHTMLAttributes,
      "href" | "target" | "rel" | "type"
    > {
  as?: any;
  activeClass?: string;
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: string; // need to manually type to avoid breaking typedPages
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: LinkProps["to"];
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
   * Value passed to the attribute `aria-current` when the link is exact active.
   *
   * @defaultValue `'page'`
   */
  ariaCurrentValue?:
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
  /**
   * The type of the button when not a link.
   * @defaultValue `'button'`
   */
  type?: ButtonHTMLAttributes["type"];
  disabled?: boolean;
  /** Force the link to be active independent of the current route. */
  active?: boolean;
  /** Will only be active if the current route is an exact match. */
  exact?: boolean;
  /** The class to apply when the link is inactive. */
  inactiveClass?: string;
  custom?: boolean;
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean;
  class?: ClassValue;
}

export interface LinkSlots {
  default(props: { active: boolean }): any;
}
</script>

<script setup lang="ts">
import { computed } from "vue";

import { useAppConfig } from "#imports";

import { cv, mergeClasses } from "@veehance/core/utils";

import { usePage } from "@inertiajs/vue3";
import { reactiveOmit } from "@vueuse/core";
import { defu } from "defu";
import { isString } from "es-toolkit";
import { useForwardProps } from "reka-ui";
import { hasProtocol } from "ufo";

import ULinkBase from "./LinkBase.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LinkProps>(), {
  as: "button",
  type: "button",
  ariaCurrencvalue: "page",
  active: undefined,
});
defineSlots<LinkSlots>();
  
const page = usePage();
const appConfig = useAppConfig() as {
  ui?: { components?: { link: typeof theme } };
};

const routerLinkProps = useForwardProps(
  reactiveOmit(
    props,
    "as",
    "type",
    "disabled",
    "active",
    "exact",
    "activeClass",
    "inactiveClass",
    "to",
    "href",
    "raw",
    "custom",
    "class",
    "noRel",
  ),
);

const ui = computed(() =>
  cv({
    extend: cv(theme),
    ...defu(
      {
        variants: {
          active: {
            true: mergeClasses(
              appConfig.ui?.components?.link?.variants?.active?.true,
              props.activeClass,
            ),
            false: mergeClasses(
              appConfig.ui?.components?.link?.variants?.active?.false,
              props.inactiveClass,
            ),
          },
        },
      },
      appConfig.ui?.components?.link || {},
    ),
  }),
);

const href = computed(() => props.to ?? props.href);

const isExternal = computed(() => {
  if (props.target === "_blank") return true;
  if (props.external) return true;
  if (!href.value) return false;
  return (
    isString(href.value) &&
    hasProtocol(href.value, { acceptRelative: true })
  );
});

const hasTarget = computed(() => !!props.target && props.target !== "_self");

const rel = computed(() => {
  if (props.noRel) return null;
  if (props.rel !== undefined) return props.rel || null;
  if (isExternal.value || hasTarget.value) return "noopener noreferrer";
  return null;
});

const isLinkActive = computed(() => {
  if (props.active !== undefined) return props.active;
  if (!href.value) return false;
  if (props.exact && page.url === href.value) return true;
  if (!props.exact && page.url.startsWith(href.value)) return true;
  return false;
});

const linkClass = computed(() => {
  const active = isLinkActive.value;
  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass];
  return ui.value({ class: props.class, active, disabled: props.disabled });
});
</script>

<template>
  <template v-if="custom">
    <slot
      v-bind="{
        ...$attrs,
        ...routerLinkProps,
        as,
        type,
        disabled,
        href,
        rel,
        target,
        active: isLinkActive,
        isExternal
      }"
    />
  </template>
  <ULinkBase
    v-else
    v-bind="{
      ...$attrs,
      ...routerLinkProps,
      as,
      type,
      disabled,
      href,
      rel,
      target,
      isExternal
    }"
    :class="linkClass"
  >
    <slot :active="isLinkActive" />
  </ULinkBase>
</template>