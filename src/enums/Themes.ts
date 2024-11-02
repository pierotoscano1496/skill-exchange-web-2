enum Themes {
    "primary",
    "neutral",
    "accent",
    "secondary",
    "bordes",
    "hero",
    "error",
    "basic"
}

export const themes = Object.values(Themes);
export type ThemesType = keyof typeof Themes;