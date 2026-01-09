import "./styles.css";

import { createApp } from "vue";

import ui from "@veehance/vue/plugin";

import App from "./app.vue";

const app = createApp(App);
app.use(ui);

app.mount("#root");
