import type { PlopTypes } from "@turbo/gen";

import { createPackageGenerator } from "./package/generator";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  for (const gen of [createPackageGenerator]) {
    gen(plop);
  }
}
