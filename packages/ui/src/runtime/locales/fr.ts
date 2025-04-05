import type { Messages } from "../types";

import { defineLocale } from "../composables/defineLocale";

export default defineLocale<Messages>({
  name: "Français",
  code: "fr",
  messages: {
    modal: {
      close: "Fermer",
    },
    slideover: {
      close: "Fermer",
    },
  },
});
