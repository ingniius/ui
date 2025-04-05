import type { MaybeRefOrGetter } from "vue";

import { useAppConfig } from "#imports";
import { computed, toValue } from "vue";

import type { AvatarProps } from "../types";

export interface UseComponentIconsProps {
  icon?: string;
  avatar?: AvatarProps;
  leading?: boolean;
  leadingIcon?: string;
  trailing?: boolean;
  trailingIcon?: string;
  loading?: boolean;
  loadingIcon?: string;
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const appConfig = useAppConfig();

  const props = computed(() => toValue(componentProps));

  const isLeading = computed(() => (props.value.icon && props.value.leading) || (props.value.icon && !props.value.trailing) || (props.value.loading && !props.value.trailing) || !!props.value.leadingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading)
      return props.value.loadingIcon || appConfig.ui.icons.loading;

    return props.value.leadingIcon || props.value.icon;
  });

  const isTrailing = computed(() => (props.value.icon && props.value.trailing) || (props.value.loading && props.value.trailing) || !!props.value.trailingIcon);
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value)
      return props.value.loadingIcon || appConfig.ui.icons.loading;

    return props.value.trailingIcon || props.value.icon;
  });

  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName,
  };
}
