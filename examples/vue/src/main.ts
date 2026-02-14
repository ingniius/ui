import "./styles.css";

import ui from "@veehance/vue/plugin";

import { createRouter, RouterProvider } from "@tanstack/vue-router";
import { createApp, h } from "vue";

import reportWebVitals from "./reportWebVitals";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/vue-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const app = createApp({
    setup() {
      return () => h(RouterProvider, { router });
    },
  });

  app.use(ui);
  app.mount("#root");
}

reportWebVitals();
