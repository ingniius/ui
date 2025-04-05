import { defineCommand } from "citty";

import { version } from "../package.json";

export default defineCommand({
  meta: {
    name: "iueev",
    description: "Veehance UI CLI",
    version,
  },
});
