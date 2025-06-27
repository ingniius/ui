export interface Icon { solid: string; outline: string; mini?: string; micro?: string };

export type Icons<T> = Partial<T> & Record<string, Icon>;

export type Iconset = 'solid' | 'outline';
