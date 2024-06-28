import type { Ref } from "vue";
import { computed, toValue, useAttrs } from "vue";

import type { Abstract, ClassName } from "@vee-ui/system";
import { mergeConfig } from "@vee-ui/system";
import { omit } from "@vee-ui/util";

/**
 * @publicApi
 * @param $ui
 * @param $config
 * @param $wrapperClass
 */
export const useUI = <T>(
  $ui?: Ref<Abstract<T> | undefined>,
  $config?: Ref<T> | T,
  $wrapperClass?: Ref<ClassName>,
) => {
  const $attrs = useAttrs();

  const ui = computed(() => {
    const _ui = toValue($ui);
    const _config = toValue($config);
    const _wrapperClass = toValue($wrapperClass);

    return mergeConfig<T>(
      _ui?.strategy || "merge",
      _wrapperClass ? { root: { wrapper: _wrapperClass } } : {},
      _ui || {},
      _config || {},
    );
  });

  const attrs = computed(() => omit($attrs, ["class"]));

  return {
    ui,
    attrs,
  };
};
