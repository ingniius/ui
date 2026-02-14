import type { ACCENT_KEYS, SHADE_KEYS } from "../constants";
import type { Dict, Prettify, Stringify } from "./abstract";
import type { Token } from "./schema";

export type Colors<T extends Color = Color> = Prettify<
  Dict<Stringify<T>, Stringify<ColorAccent> | ColorShade> & {
    neutral: NeutralColor;
  }
>;

export type Color = Token["color"];

type ColorAccent = (typeof ACCENT_KEYS)[number];
type ColorShade = Dict<(typeof SHADE_KEYS)[number], string>;

export type NeutralColor = Token["baseColor"];
