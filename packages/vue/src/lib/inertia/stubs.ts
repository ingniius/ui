import { usePage } from "@inertiajs/vue3";

export {
  clearError,
  defineNuxtPlugin,
  useAppConfig,
  useColorMode,
  useCookie,
  useHead,
  useNuxtApp,
  useRuntimeHook,
  useState,
} from "../base/stubs";

export const useRoute = () => {
  const page = usePage();
  return { fullPath: page.url };
};

export const useRouter = () => {};
