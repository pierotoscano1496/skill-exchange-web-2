enum Themes {
    "primary",
    "neutral",
    "accent",
    "secondary",
    "bordes",
    "hero",
    "error"
}

export const themes = Object.values(Themes);
export type ThemesType = keyof typeof Themes;