enum ComponentMode {
    "filled",
    "outline",
    "ghost",
    "flat",
    "text",
    "elevated",
    "floating"
}

export type ComponentModeType = keyof typeof ComponentMode