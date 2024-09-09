enum Shape {
  "circle",
  "rectangle",
}

export type ShapeType = keyof typeof Shape;
