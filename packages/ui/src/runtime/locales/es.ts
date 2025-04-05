import type { Messages } from "../types";

import { defineLocale } from "../composables/defineLocale";

export default defineLocale<Messages>({
  name: "Español",
  code: "es",
  messages: {
    modal: {
      close: "Cerrar",
    },
    slideover: {
      close: "Cerrar",
    },
  },
});
