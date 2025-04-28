// Grosor del texto
enum Weight {
  normal = "normal", // Peso estándar
  bold = "bold", // Peso fuerte para títulos o énfasis
}

// Tamaño del texto (preferido para componentes reutilizables)
enum TextSize {
  extraSmall = "text-xs", // Texto muy pequeño
  small = "text-sm", // Texto pequeño
  medium = "text-base", // Texto base
  large = "text-lg", // Texto grande
  extraLarge = "text-xl", // Texto muy grande
}

// Niveles de encabezados (para jerarquías semánticas)
enum Level {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
}

// Alineación del texto
enum TextAlign {
  center = "text-center",
  start = "text-start",
  end = "text-end",
  justify = "text-justify",
}

export type WeightType = keyof typeof Weight;
export type TextSizeType = keyof typeof TextSize;
export type LevelType = keyof typeof Level;
export type TextAlignType = keyof typeof TextAlign;
