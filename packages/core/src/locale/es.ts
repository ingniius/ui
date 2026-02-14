import { defineLocale } from "../lib/helpers";
import type { Messages } from "../lib/types";

export default defineLocale<Messages>({
  name: "Español",
  code: "es",
  messages: {
    colorMode: {
      dark: "Oscuro",
      light: "Claro",
      switchToDark: "Cambiar a modo oscuro",
      switchToLight: "Cambiar a modo claro",
      system: "Sistema",
    },
    error: {
      clear: "Volver al inicio",
    },
  },
});
