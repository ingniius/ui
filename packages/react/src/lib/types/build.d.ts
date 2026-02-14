declare module "#build/app.config" {
  import type { UI } from "@veehance/core/types";

  import type * as ui from "#build/ui/index";

  const _default: { colorMode: true; ui: UI<typeof ui> };
  export default _default;
}
