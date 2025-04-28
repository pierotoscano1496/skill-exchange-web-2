export enum BasicThemes {
  primary = "primary",
  secondary = "secondary",
  error = "error",
  basic = "basic",
}

export enum CardThemes {
  primary = "primary",
  secondary = "secondary",
  error = "error",
  basic = "basic",
  neutral = "neutral",
  accent = "accent",
  hero = "hero",
}

export enum Themes {
  primary = "primary", // Naranja principal
  secondary = "secondary", // Amarillo complementario
  accent = "accent", // Verde para acentos
  neutral = "neutral", // Gris neutro
  error = "error", // Rojo para errores
}

export enum VariantThemes {
  primary = "primary",
  secondary = "secondary",
  error = "error",
  basic = "basic",
}

export enum InputThemes {
  primary = "primary",
  accent = "accent",
  neutral = "neutral",
  error = "error",
}

export const themes = Object.values(Themes);
export type ThemesType = keyof typeof Themes;

export type CardThemesType = keyof typeof CardThemes;
export type InputThemesType = keyof typeof InputThemes;
export type VariantThemesType = keyof typeof VariantThemes;
