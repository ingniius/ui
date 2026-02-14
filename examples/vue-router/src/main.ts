import "./styles.css";

import ui from "@veehance/vue/plugin";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./app.vue";
import HomePage from "./pages/index.vue";

const router = createRouter({
  routes: [{ path: "/", component: HomePage }],
  history: createWebHistory(),
});

const app = createApp(App);

app.use(router);
app.use(ui);

app.mount("#root");
