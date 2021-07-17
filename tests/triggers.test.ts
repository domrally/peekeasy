import { Events } from '../code/events.js'
// 
export const assertTriggers = async () => {
	const A = Symbol('A')
	const B = Symbol('B')
	type Triggers = typeof Triggers
	const Triggers = Object.freeze({
		A,
		B,
	} as const)

	const shouldFail = (triggers: Events<Triggers>) => {
		throw new Error('❌ Expected shouldFail to fail, but it threw success')
	}
	const shouldPass = (triggers: Events<Triggers>) => {
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
