import { useColorMode as useColorModeVueUse } from "@vueuse/core";
import { onScopeDispose, type Ref, ref, type Plugin as VuePlugin } from "vue";

import type { NuxtApp } from "#app";
import appConfig from "#build/app.config";

import type { Dict } from "@veehance/core/types";

import { createHooks } from "hookable";

export { useHead } from "@unhead/vue";

export { useAppConfig } from "./composables/use-app-config";

export const clearError = () => {};

export const useColorMode = () => {
  if (!appConfig.colorMode) return { forced: true };
  const { store, system } = useColorModeVueUse();

  return {
    get preference() {
      return store.value === "auto" ? "system" : store.value;
    },
    set preference(value) {
      store.value = value === "system" ? "auto" : value;
    },
    get value() {
      return store.value === "auto" ? system.value : store.value;
    },
    forced: false,
  };
};

export const useCookie = <T = string>(_name: string, _options: Dict = {}) => {
  const value = ref(_options?.default?.() ?? null) as Ref<T>;

  return {
    value: value.value,
    get: () => value.value,
    set: () => {},
    update: () => {},
    refresh: () => Promise.resolve(value.value),
    remove: () => {},
  };
};

const state: Dict = {};

export const useState = <T>(key: string, init: () => T): Ref<T> => {
  if (state[key]) return state[key] as Ref<T>;
  const value = ref(init());
  state[key] = value;
  return value as Ref<T>;
};

const hooks = createHooks();

export function useNuxtApp() {
  return {
    isHydrating: true,
    payload: { serverRendered: import.meta.env.SSR || false },
    hooks,
    hook: hooks.hook,
  };
}

export function useRuntimeHook(
  name: string,
  fn: (...args: any[]) => void,
): void {
  const nuxtApp = useNuxtApp();
  const unregister = nuxtApp.hook(name, fn);
  onScopeDispose(unregister);
}

export function defineNuxtPlugin(plugin: (nuxtApp: NuxtApp) => void) {
  return {
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app } as NuxtApp));
    },
  } satisfies VuePlugin;
}

export const useRoute = () => {
  return {
    fullPath: "/",
    path: "/",
    name: null,
    params: {},
    query: {},
    hash: "",
    meta: {},
    matched: [],
    redirectedFrom: undefined,
  };
};

export const useRouter = () => {
  return {
    push: () => Promise.resolve(),
    replace: () => Promise.resolve(),
    go: () => {},
    back: () => {},
    forward: () => {},
    beforeEach: () => () => {},
    beforeResolve: () => () => {},
    afterEach: () => () => {},
    onError: () => () => {},
    isReady: () => Promise.resolve(true),
    currentRoute: ref({
      fullPath: "/",
      path: "/",
      name: null,
      params: {},
      query: {},
      hash: "",
      meta: {},
      matched: [],
      redirectedFrom: undefined,
    }),
    options: {},
  };
};
