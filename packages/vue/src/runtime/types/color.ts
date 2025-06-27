import colors from 'tailwindcss/colors';

export type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {});

export type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | (string & {});
