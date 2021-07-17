const Top = Symbol('Top'),
	Side = Symbol('Side')
export const Buttons = Object.freeze({
	Top,
	Side
} as const)
export type Buttons = typeof Buttons
