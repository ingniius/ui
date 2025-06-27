// packages/alpine/dist/runtime/stores/ui.mjs
function createUI() {
  const ui = {
    appearance: localStorage.getItem("ui.appearance") ?? "system",
    systemAppearanceChanged: 1,
    get dark() {
      JSON.stringify(ui.systemAppearanceChanged);
      if (ui.appearance === "system")
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      return ui.appearance === "dark";
    },
    set dark(value) {
      const current = ui.dark;
      if (value === current)
        return;
      ui.appearance = value ? "dark" : "light";
    },
    applyAppearance() {
      const applyDark = () => document.documentElement.classList.add("dark");
      const applyLight = () => document.documentElement.classList.remove("dark");
      if (ui.appearance === "system") {
        localStorage.removeItem("ui.appearance");
        window.matchMedia("(prefers-color-scheme: dark)").matches ? applyDark() : applyLight();
      } else {
        localStorage.setItem("ui.appearance", ui.appearance);
        ui.appearance === "dark" ? applyDark() : applyLight();
      }
    }
  };
  return ui;
}

// packages/alpine/dist/runtime/utils/color-mode.mjs
function isColorMode() {
  return window.TailwindConfig?.darkMode === "class";
}

// packages/alpine/dist/module.mjs
var VeePlugin = (Alpine) => {
  const ui = createUI();
  window.UI = ui;
  Alpine.magic("ui", () => ui);
  if (isColorMode()) {
    Alpine.effect(() => ui.applyAppearance());
    document.addEventListener("livewire:navigated", () => {
      ui.applyAppearance();
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", () => {
      ui.systemAppearanceChanged++;
      ui.applyAppearance();
    });
  }
};

// packages/alpine/dist/bundler.mjs
function waitForAlpine() {
  return new Promise((resolve) => {
    if (window.Alpine)
      return resolve(window.Alpine);
    const int = setInterval(() => {
      if (window.Alpine) {
        clearInterval(int);
        resolve(window.Alpine);
      }
    }, 10);
  });
}
waitForAlpine().then((Alpine) => {
  if (!Alpine.__vee_registered) {
    Alpine.__vee_registered = true;
    Alpine.plugin(VeePlugin);
  }
});
