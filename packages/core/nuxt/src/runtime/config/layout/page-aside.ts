export default {
  slots: {
    root: "hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-[var(--ui-header-height)] py-8 lg:px-4 lg:-ml-4",
    container: "relative",
    top: "sticky -top-8 -mt-8 pointer-events-none z-[1]",
    topHeader: "h-8 bg-[var(--ui-bg)] -mx-4 px-4",
    topBody: "bg-[var(--ui-bg)] relative pointer-events-auto flex -mx-4 px-4",
    topFooter: "h-8 bg-gradient-to-b from-[var(--ui-bg)] -mx-4 px-4",
  },
};
