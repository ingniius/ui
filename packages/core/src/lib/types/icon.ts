import type { Dict, Prettify, Stringify } from "./abstract";
import type { Token } from "./schema";

export type Icons<T extends Icon = Icon> = Prettify<Dict<Stringify<T>, string>>;

export type Icon = Token["icon"];
