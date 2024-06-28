import type { ComponentPublicInstance } from "vue";
import { computed, getCurrentInstance, ref } from "vue";

import { unrefElement } from "@vueuse/core";

import type { Dict } from "@vee-ui/util";

/**
 * @publicApi
 */
export function useExposeRef() {
  const instance = getCurrentInstance()!;

  const currentRef = ref<Element | ComponentPublicInstance | null>();
  const currentElement = computed<HTMLElement>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    // @ts-ignore
    return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName)
      ? // @ts-ignore
        currentRef.value?.$el.nextElementSibling
      : // @ts-ignore
        unrefElement(currentRef);
  });

  const localExpose: Dict | null = Object.assign({}, instance.exposed);
  const ret: Dict = {};

  // retrieve props for current instance
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key],
    });
  }

  // retrieve default exposed value
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => localExpose![key],
      });
    }
  }

  // retrieve original first root element
  Object.defineProperty(ret, "$el", {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el,
  });

  instance.exposed = ret;

  function forwardRef(ref: Element | ComponentPublicInstance | null) {
    currentRef.value = ref;

    if (ref instanceof Element || !ref) return;

    // retrieve the forwarded element
    Object.defineProperty(ret, "$el", {
      enumerable: true,
      configurable: true,
      get: () => ref.$el,
    });

    instance.exposed = ret;
  }

  return { forwardRef, currentRef, currentElement };
}
