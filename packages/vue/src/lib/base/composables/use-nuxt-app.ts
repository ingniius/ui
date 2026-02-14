import { createHooks } from "hookable";

const hooks = createHooks();

export const useNuxtApp = () => {
  return {
    isHydrating: true,
    payload: { serverRendered: import.meta.env.SSR || false },
    hooks,
    hook: hooks.hook,
  };
};
