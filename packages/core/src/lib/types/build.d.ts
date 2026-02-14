declare module "#build/app.config" {
  const _default: {
    ui: {
      css: { strategy: "join" | "merge"; prefix: string };
    };
  };

  export default _default;
}
