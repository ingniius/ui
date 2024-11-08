<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { LinkProps } from "@nuxt/ui";

import _appConfig from "#build/app.config";
import { pageAnchors as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & {
  ui: { pageAnchors: Partial<ReturnType<typeof theme>> };
};

const pageAnchors = cva({ extend: cva(theme(appConfig.ui)), ...(appConfig.ui?.pageAnchors || {}) });

export interface PageAnchor extends Omit<LinkProps, "custom"> {
  label: string;
  icon?: string;
}

export interface PageAnchorsProps<T> extends UComp {
  links?: T[];
  class?: any;
  ui?: Partial<typeof pageAnchors.slots>;
}

type SlotProps<T> = (props: { link: T; active: boolean }) => any;

export interface PageAnchorsSlots<T> {
  "link": SlotProps<T>;
  "link-leading": SlotProps<T>;
  "link-label": SlotProps<T>;
  "link-trailing": SlotProps<T>;
}
</script>

<script lang="ts" generic="T extends PageAnchor" setup>
import { useAppConfig } from "#imports";
import { pickLinkProps } from "#ui/utils/link";

import { Primitive } from "radix-vue";

import UIcon from "#ui/components/Icon.vue";
import ULink from "#ui/components/Link.vue";
import ULinkBase from "#ui/components/LinkBase.vue";

const props = withDefaults(defineProps<PageAnchorsProps<T>>(), {
  as: "nav",
  class: undefined,
});

const slots = defineSlots<PageAnchorsSlots<T>>();

const appConfig = useAppConfig();

const ui = pageAnchors();
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <ul :class="ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in links" :key="index" :class="ui.item({ class: props.ui?.item })">
        <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
          <ULinkBase v-bind="slotProps" :class="ui.link({ class: props.ui?.link, active })">
            <slot name="link" :link="link" :active="active">
              <div
                v-if="link.icon || !!slots['link-leading']"
                :class="ui.linkLeading({ class: props.ui?.linkLeading, active })"
              >
                <slot name="link-leading" :link="link" :active="active">
                  <UIcon
                    v-if="link.icon"
                    :name="link.icon"
                    :class="ui.linkLeadingIcon({ class: props.ui?.linkLeadingIcon, active })"
                  />
                </slot>
              </div>

              <span
                v-if="link.label || !!slots['link-label']"
                :class="ui.linkLabel({ class: props.ui?.linkLabel, active })"
              >
                <slot name="link-label" :link="link" :active="active">
                  {{ link.label }}
                </slot>

                <UIcon
                  v-if="link.target === '_blank'"
                  :name="appConfig.ui.icons.external"
                  :class="
                    ui.linkLabelExternalIcon({ class: props.ui?.linkLabelExternalIcon, active })
                  "
                />
              </span>

              <slot name="link-trailing" :link="link" :active="active" />
            </slot>
          </ULinkBase>
        </ULink>
      </li>
    </ul>
  </Primitive>
</template>
