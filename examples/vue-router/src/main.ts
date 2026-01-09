import "./styles.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import ui from "@veehance/vue/plugin";

import App from "./app.vue";
import HomePage from "./pages/index.vue";
import PlaygroundPage from "./pages/playground/index.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/playground", component: PlaygroundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(ui);

app.mount("#root");
