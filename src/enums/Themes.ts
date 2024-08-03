enum Themes {
    "primary",
    "secondary",
    "error"
}

export const themes = Object.values(Themes);
export type ThemesType = keyof typeof Themes;