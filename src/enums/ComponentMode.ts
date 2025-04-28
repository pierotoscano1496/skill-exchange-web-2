enum ComponentMode {
  filled, // Fondo sólido
  outline, // Borde visible, fondo transparente
  ghost, // Fondo transparente, solo texto visible
  text, // Solo texto con efecto visual
}

export type ComponentModeType = keyof typeof ComponentMode;
