import type { Messages } from "../types";

import { defineLocale } from "../composables/defineLocale";

export default defineLocale<Messages>({
  name: "Português (Brasil)",
  code: "pt-BR",
  messages: {
    modal: {
      close: "Fechar",
    },
    slideover: {
      close: "Fechar",
    },
  },
});
