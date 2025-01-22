enum ModeViews {
  "dark",
  "light",
}

export const modeViews = Object.values(ModeViews);
export type ModeViewsType = keyof typeof ModeViews;
