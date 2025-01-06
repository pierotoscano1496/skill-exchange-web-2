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

export type WeightType = keyof typeof Weight;
export type LevelType = keyof typeof Level;
export type TextSizeType = keyof typeof TextSize;
