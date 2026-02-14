import { isObject } from "radash";
import colors from "tailwindcss/colors";

import { COLOR_SHADES } from "../constants";
import type { Colors } from "../types";

export function generateColors({ neutral, ...colors }: Partial<Colors>) {
  const shadeBlock = indent(
    Object.entries({ ...colors, neutral })
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => generateShades(key, value!))
      .join("\n\n"),
  );

  const validKeys = Object.entries(colors)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);

  const lightBlock = indent(validKeys.map((key) => generateColor(key, 500)));
  const darkBlock = indent(validKeys.map((key) => generateColor(key, 400)));

  return `@layer theme {
  :root, :host {
${shadeBlock}
  }

  :root[data-theme="light"],
  :host[data-theme="light"] {
${lightBlock}
  }

  :root[data-theme="dark"],
  :host[data-theme="dark"] {
${darkBlock}
  }
}\n`;
}

function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

function generateShades(key: string, value: string) {
  return COLOR_SHADES.map(
    (shade) =>
      `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`,
  ).join("\n");
}

function getColor(
  color: keyof typeof colors,
  shade: (typeof COLOR_SHADES)[number],
): string {
  if (color in colors && isObject(colors[color]) && shade in colors[color])
    return colors[color][shade] as string;
  return "";
}

function indent(lines: string | string[], spaces = 4) {
  const text = Array.isArray(lines) ? lines.join("\n") : lines;
  return text.replace(/^/gm, " ".repeat(spaces));
}
