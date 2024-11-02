enum InputTypes {
    "text",
    "password",
    "email",
    "number",
    "date",
    "tel",
    "url"
}

export const inputTypes = Object.keys(InputTypes)
export type InputType = keyof typeof InputTypes