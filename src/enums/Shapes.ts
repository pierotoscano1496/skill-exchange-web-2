enum Shape {
  "circle",
  "rectangle",
  "noShape"
}

export type ShapeType = keyof typeof Shape;
