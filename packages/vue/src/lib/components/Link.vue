<script lang="ts">
import theme from "#build/theme/link";

import type { ClassValue } from "@veehance/core/types";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "../types/html";
import type { NuxtLinkProps } from "../types/link";

export interface LinkProps
  extends NuxtLinkProps,
    /** @vue-ignore */ Omit<ButtonHTMLAttributes, "type" | "disabled">,
    /** @vue-ignore */ Omit<
      AnchorHTMLAttributes,
      "href" | "target" | "rel" | "type"
    > {
  as?: any;
  type?: ButtonHTMLAttributes["type"];
  disabled?: boolean;
  /** Force the link to be active independent of the current route. */
  active?: boolean;
  /** Will only be active if the current route is an exact match. */
  exact?: boolean;
  /** Allows controlling how the current route query sets the link as active. */
  exactQuery?: boolean | "partial";
  /** Will only be active if the current route hash is an exact match. */
  exactHash?: boolean;
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

import { useAppConfig, useRoute } from "#imports";
import { NuxtLink } from "#components";

import { cv, isPartiallyEqual, mergeClasses } from "@veehance/core/utils";

import { reactiveOmit } from "@vueuse/core";
import { defu } from "defu";
import { isEqual } from "ohash/utils";
import { useForwardProps } from "reka-ui";

import ULinkBase from "./LinkBase.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LinkProps>(), {
  as: "button",
  type: "button",
  ariaCurrentValue: "page",
  active: undefined,
});
defineSlots<LinkSlots>();

const route = useRoute();
const appConfig = useAppConfig() as {
  ui?: { components?: { link: typeof theme } };
};

const nuxtLinkProps = useForwardProps(
  reactiveOmit(
    props,
    "as",
    "type",
    "disabled",
    "active",
    "exact",
    "exactQuery",
    "exactHash",
    "activeClass",
    "inactiveClass",
    "to",
    "href",
    "raw",
    "custom",
    "class",
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

const to = computed(() => props.to ?? props.href);

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined) return props.active;
  if (props.exactQuery === "partial") {
    if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
  } else if (props.exactQuery === true) {
    if (!isEqual(linkRoute.query, route.query)) return false;
  }
  if (props.exactHash && linkRoute.hash !== route.hash) return false;
  if (props.exact && isExactActive) return true;
  if (!props.exact && isActive) return true;
  return false;
}

function resolveLinkClass({ route, isActive, isExactActive }: any) {
  const active = isLinkActive({ route, isActive, isExactActive });
  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass];
  return ui.value({ class: props.class, active, disabled: props.disabled });
}
</script>

<template>
  <NuxtLink v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }" v-bind="nuxtLinkProps" :to="to" custom>
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          as,
          type,
          disabled,
          href,
          navigate,
          rel,
          target,
          isExternal: !!props.external,
          active: isLinkActive({ route: linkRoute, isActive, isExactActive })
        }"
      />
    </template>
    <ULinkBase
      v-else
      v-bind="{
        ...$attrs,
        ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
        as,
        type,
        disabled,
        href,
        navigate,
        rel,
        target,
        isExternal: !!props.external
      }"
      :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
    >
      <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })" />
    </ULinkBase>
  </NuxtLink>
</template>