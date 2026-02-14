import { defineLocale } from "../lib/helpers";
import type { Messages } from "../lib/types";

export default defineLocale<Messages>({
  name: "Português",
  code: "pt",
  messages: {
    colorMode: {
      dark: "Escuro",
      light: "Claro",
      switchToDark: "Mudar para modo escuro",
      switchToLight: "Mudar para modo claro",
      system: "Sistema",
    },
    error: {
      clear: "Voltar para a página inicial",
    },
  },
});
