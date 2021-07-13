const Top = Symbol('Top'),
	Side = Symbol('Side')
export const Buttons = Object.freeze({
	Top,
	Side
} as const)
type Triggers<T, K extends keyof T> = T[K]
export type Buttons = Triggers<typeof Buttons, keyof typeof Buttons>
