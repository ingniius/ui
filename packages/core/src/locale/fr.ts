import { defineLocale } from "../lib/helpers";
import type { Messages } from "../lib/types";

export default defineLocale<Messages>({
  name: "Français",
  code: "fr",
  messages: {
    colorMode: {
      dark: "Sombre",
      light: "Clair",
      switchToDark: "Passer en mode sombre",
      switchToLight: "Passer en mode clair",
      system: "Système",
    },
    error: {
      clear: "Retour à l'accueil",
    },
  },
});
