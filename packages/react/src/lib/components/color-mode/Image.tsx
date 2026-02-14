import type { ClassValue } from "@veehance/core/types";
import { cn } from "@veehance/core/utils";

import type { ImgHTMLAttributes } from "../../types/html";
import Image from "../ui/Image";

export type ColorModeImageProps = Omit<ImgHTMLAttributes, "src"> & {
  dark: string;
  light: string;
  alt: string;
  height: number;
  width: number;
  layout?: "fixed" | "constrained" | "fullWidth";
  className?: ClassValue;
};

function ColorModeImage({
  className,
  light,
  dark,
  ...props
}: ColorModeImageProps) {
  return (
    <>
      <Image src={light} className={cn("dark:hidden", className)} {...props} />
      <Image
        src={dark}
        className={cn("hidden dark:block", className)}
        {...props}
      />
    </>
  );
}

export default ColorModeImage;
