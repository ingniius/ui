import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

import { Image as Img } from "#build/ui/components";

import type { ImgHTMLAttributes } from "../../types/html";

export type ImageProps = ImgHTMLAttributes & {
  src: string;
  alt: string;
  height: number;
  width: number;
  layout?: "fixed" | "constrained" | "fullWidth";
  className?: ClassValue;
};

function Image({ className, src, alt, ...props }: ImageProps) {
  return <Img src={src} alt={alt} className={cx(className)} {...props} />;
}

export default Image;
