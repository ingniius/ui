import type { ImgHTMLAttributes as VueImgHTMLAttributes } from "vue";

export type ImgHTMLAttributes = Pick<
  VueImgHTMLAttributes,
  | "alt"
  | "crossorigin"
  | "decoding"
  | "height"
  | "loading"
  | "referrerpolicy"
  | "sizes"
  | "src"
  | "srcset"
  | "usemap"
  | "width"
>;
