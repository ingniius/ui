<script lang="ts">
import type { ButtonHTMLAttributes } from "vue";

import theme from "#build/theme/link";

import type { ClassValue } from "@veehance/core/types";

import type { BaseLinkProps } from "../types/link";

export interface LinkProps extends BaseLinkProps {
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
  /** The class to apply when the link is active. */
  activeClass?: string;
  /** The value of the `aria-current` attribute when the link is active. */
  ariaCurrentValue?: string;
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

import { defu } from "defu";
import { hasProtocol } from "ufo";

import ULinkBase from "../../components/LinkBase.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LinkProps>(), {
  as: "button",
  type: "button",
  ariaCurrentValue: "page",
  active: undefined,
});
defineSlots<LinkSlots>();

const appConfig = useAppConfig() as {
  ui?: { components?: { link: typeof theme } };
};

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
  return hasProtocol(href.value, { acceptRelative: true });
});

const isLinkActive = computed(() => {
  if (props.active !== undefined) return props.active;
  return false;
});

const linkClass = computed(() => {
  const active = isLinkActive.value;
  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass];
  return ui.value({ class: props.class, active, disabled: props.disabled });
});

const linkRel = computed(() => {
  if (props.noRel) return null;
  if (props.rel) return props.rel;
  if (isExternal.value) return "noopener noreferrer";
  return null;
});
</script>

<template>
  <template v-if="custom">
    <slot
      v-bind="{
        ...$attrs,
        as,
        type,
        disabled,
        href: href,
        navigate: undefined,
        rel: linkRel,
        target: target || (isExternal ? '_blank' : undefined),
        isExternal,
        active: isLinkActive
      }"
    />
  </template>
  <ULinkBase
    v-else
    v-bind="{
      ...$attrs,
      as,
      type,
      disabled,
      href: href,
      navigate: undefined,
      rel: linkRel,
      target: target || (isExternal ? '_blank' : undefined),
      isExternal
    }"
    :class="linkClass"
  >
    <slot :active="isLinkActive" />
  </ULinkBase>
</template>