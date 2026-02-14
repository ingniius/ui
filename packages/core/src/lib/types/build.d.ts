declare module "#build/app.config" {
  const _default: {
    ui: { tw: { merge: boolean; options: { prefix: string } } };
  };
  export default _default;
}

declare module "#build/ui/icons/index" {
  import type { Dict } from "./abstract";

  const _default: Dict<string, Dict>;
  export default _default;
}
