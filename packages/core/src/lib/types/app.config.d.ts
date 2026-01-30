declare module "#build/app.config" {
  const _default: {
    ui: {
      css: {
        strategy: "merge" | "join";
        prefix: string;
        classGroups?: { [x: string]: any };
      };
    };
  };

  export default _default;
}
