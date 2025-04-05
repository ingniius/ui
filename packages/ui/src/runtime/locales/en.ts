import type { Messages } from "../types";

import { defineLocale } from "../composables/defineLocale";

export default defineLocale<Messages>({
  name: "English",
  code: "en",
  messages: {
    modal: {
      close: "Close",
    },
    slideover: {
      close: "Close",
    },
  },
});
