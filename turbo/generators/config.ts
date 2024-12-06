import type { PlopTypes } from "@turbo/gen";

import { createNuxtGenerator } from "./nuxt/generator";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  [createNuxtGenerator].forEach((gen) => gen(plop));
}
