enum Size {
  "small",
  "medium",
  "large",
}

export type SizeType = keyof typeof Size;
export type ExtendedSizeType = SizeType | "full";
