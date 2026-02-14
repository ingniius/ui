import type { Locale, Messages } from "@veehance/core/types";

import { ColorModeProvider } from "../../providers/color-mode";
import { HeadProvider } from "../../providers/head";
import { LocaleProvider } from "../../providers/locale";

export type AppProps<M extends Messages = Messages> = {
  children: React.ReactNode;
  defaultTheme?: string;
  disableTransition?: boolean;
  storageKey?: string;
  locale?: Locale<M>;
};

function App<M extends Messages>({ children, locale, ...props }: AppProps<M>) {
  return (
    <HeadProvider>
      <ColorModeProvider {...props}>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </ColorModeProvider>
    </HeadProvider>
  );
}

export default App;
