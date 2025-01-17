enum Weight {
  "normal",
  "bold",
  "extraBold",
}

enum Level {
  "h5",
  "h4",
  "h3",
  "h2",
  "h1",
}

enum TextSize {
  "extraSmall",
  "small",
  "medium",
  "large",
  "extraLarge",
}

enum TextAlign {
  "center",
  "start",
  "end",
  "justify",
}

export type WeightType = keyof typeof Weight;
export type LevelType = keyof typeof Level;
export type TextSizeType = keyof typeof TextSize;
export type TextAlignType = keyof typeof TextAlign;
