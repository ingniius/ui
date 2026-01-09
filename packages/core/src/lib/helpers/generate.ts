import { isPlainObject } from "es-toolkit";
import colors from "tailwindcss/colors";

import type { Theme } from "../types";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function getColor(
  color: keyof typeof colors,
  shade: (typeof SHADES)[number],
): string {
  if (color in colors && isPlainObject(colors[color]) && shade in colors[color])
    return colors[color][shade] as string;
  return "";
}

export function generateShades(key: string, value: string) {
  return `${SHADES.map((shade) => `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join("\n  ")}`;
}

export function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

export function generateCSS(options: { sources: string[]; theme: Theme }) {
  const cssVariables = `${(options.sources || []).map((source) => `@source '${source}';`).join("\t")}

@theme static {
  --color-old-neutral-50: ${colors.neutral[50]};
  --color-old-neutral-100: ${colors.neutral[100]};
  --color-old-neutral-200: ${colors.neutral[200]};
  --color-old-neutral-300: ${colors.neutral[300]};
  --color-old-neutral-400: ${colors.neutral[400]};
  --color-old-neutral-500: ${colors.neutral[500]};
  --color-old-neutral-600: ${colors.neutral[600]};
  --color-old-neutral-700: ${colors.neutral[700]};
  --color-old-neutral-800: ${colors.neutral[800]};
  --color-old-neutral-900: ${colors.neutral[900]};
  --color-old-neutral-950: ${colors.neutral[950]};
}

@theme default inline {
  ${[...(options.theme.colors || []).filter((color) => !colors[color as keyof typeof colors]), "neutral"].map((color) => `${SHADES.map((shade) => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`).join("\n\t")}\n`).join("\n\t")}
  ${options.theme.colors?.map((color) => `--color-${color}: var(--ui-${color});`).join("\n\t")}

  --text-color-dimmed: var(--ui-text-dimmed);
  --text-color-muted: var(--ui-text-muted);
  --text-color-toned: var(--ui-text-toned);
  --text-color-default: var(--ui-text);
  --text-color-highlighted: var(--ui-text-highlighted);
  --text-color-inverted: var(--ui-text-inverted);

  --background-color-default: var(--ui-bg);
  --background-color-muted: var(--ui-bg-muted);
  --background-color-elevated: var(--ui-bg-elevated);
  --background-color-accented: var(--ui-bg-accented);
  --background-color-inverted: var(--ui-bg-inverted);
  --background-color-border: var(--ui-border);

  --border-color-default: var(--ui-border);
  --border-color-muted: var(--ui-border-muted);
  --border-color-accented: var(--ui-border-accented);
  --border-color-inverted: var(--ui-border-inverted);
  --border-color-bg: var(--ui-bg);

  --ring-color-default: var(--ui-border);
  --ring-color-muted: var(--ui-border-muted);
  --ring-color-accented: var(--ui-border-accented);
  --ring-color-inverted: var(--ui-border-inverted);
  --ring-color-bg: var(--ui-bg);

  --ring-offset-color-default: var(--ui-border);
  --ring-offset-color-muted: var(--ui-border-muted);
  --ring-offset-color-accented: var(--ui-border-accented);
  --ring-offset-color-inverted: var(--ui-border-inverted);
  --ring-offset-color-bg: var(--ui-bg);

  --divide-color-default: var(--ui-border);
  --divide-color-muted: var(--ui-border-muted);
  --divide-color-accented: var(--ui-border-accented);
  --divide-color-inverted: var(--ui-border-inverted);
  --divide-color-bg: var(--ui-bg);

  --outline-color-default: var(--ui-border);
  --outline-color-inverted: var(--ui-border-inverted);

  --stroke-default: var(--ui-border);
  --stroke-inverted: var(--ui-border-inverted);

  --fill-default: var(--ui-border);
  --fill-inverted: var(--ui-border-inverted);

  --radius-xs: calc(var(--ui-radius) * 0.5);
  --radius-sm: var(--ui-radius);
  --radius-md: calc(var(--ui-radius) * 1.5);
  --radius-lg: calc(var(--ui-radius) * 2);
  --radius-xl: calc(var(--ui-radius) * 3);
  --radius-2xl: calc(var(--ui-radius) * 4);
  --radius-3xl: calc(var(--ui-radius) * 6);

  --container-8xl: 90rem;
}`;

  return cssVariables;
}
