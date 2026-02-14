import type { Dict, Prettify, Stringify } from "./abstract";
import type { Token } from "./schema";

export type Icons<I extends Token["icon"] = Token["icon"]> = Prettify<
  Dict<Stringify<I>, string>
>;
