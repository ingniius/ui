import { useColorMode as useColorModeVueUse } from "@vueuse/core";

import appConfig from "#build/app.config";

export const useColorMode = () => {
  if (!appConfig.colorMode) return { forced: true };
  const { store, system } = useColorModeVueUse({ initialValue: "auto" });

  return {
    forced: false,
    get preference() {
      return store.value === "auto" ? "system" : store.value;
    },
    set preference(value) {
      store.value = value === "system" ? "auto" : value;
    },
    get value() {
      return store.value === "auto" ? system.value : store.value;
    },
  };
};
