import { createTriggers } from '../mealtime.js'

const Top = Symbol('Top'),
	Side = Symbol('Side')
export const Buttons = Object.freeze({
	Top,
	Side
} as const)
export type Buttons = createTriggers<typeof Buttons>
