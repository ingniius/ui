import appConfig from "#build/app.config";
import { createTV } from "tailwind-variants";

export const tv = createTV(appConfig.ui?.tv);
