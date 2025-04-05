import type { ComputedRef, InjectionKey } from "vue";

import { computed, inject } from "vue";

import type { ButtonGroupProps } from "../components/elements/ui/ButtonGroup.vue";
import type { GetObjectField } from "../types/generic";

export const buttonGroupInjectionKey: InjectionKey<ComputedRef<{
  size: ButtonGroupProps["size"];
  orientation: ButtonGroupProps["orientation"];
}>> = Symbol("nuxt-ui.button-group");

interface Props<T> {
  size?: GetObjectField<T, "size">;
}

export function useButtonGroup<T>(props: Props<T>) {
  const buttonGroup = inject(buttonGroupInjectionKey, undefined);
  return {
    orientation: computed(() => buttonGroup?.value.orientation),
    size: computed(() => props?.size ?? buttonGroup?.value.size),
  };
}
