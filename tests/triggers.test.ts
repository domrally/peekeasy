import { createTriggers } from '../main.js'
// 
export const assertTriggers = () => {
	const A = Symbol('A')
	const B = Symbol('B')
	const Triggers = Object.freeze({
		A,
		B,
	} as const)
	type Triggers = createTriggers<typeof Triggers>

	const shouldFail = (triggers: Triggers) => {
		throw new Error('❌ Expected shouldFail to fail, but it threw success')
	}
	const shouldPass = (triggers: Triggers) => {
	}
	try {
		shouldPass(Triggers.A)
	} catch (error) {
		throw new Error(`❌ Expected shouldPass to pass, but it threw ${error}`)
	}
	try {
		shouldFail(Symbol('B') as typeof Triggers.B)
	} catch (error) {
	}
}
