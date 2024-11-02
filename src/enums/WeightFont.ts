enum WeightFonts {
    "thin",
    "light",
    "normal",
    "semibold",
    "bold"
}

export const weightFonts = Object.keys(WeightFonts)
export type WeightFontType = keyof typeof WeightFonts;