import { compose, events, State } from '../code/mealtime.js'
import { mapTransitions } from '../code/transitions.js'
// 
export const assertTransitions = () => {
	const A = Symbol('A')
	const B = Symbol('B')
	const Letters = Object.freeze({
		A,
		B,
	} as const)
	type Letters = events<typeof Letters>

	interface Numbers { }
	const One = compose<Numbers, Letters>(
		class _ {
			constructor(public state: State<Letters>) { }
		}
	)
	const Two = compose<Numbers, Letters>(
		class _ {
			constructor(public state: State<Letters>) { }
		}
	)

	const state = State<Letters>(),
		one = new One(state),
		two = new Two(state)

	const transitionMap = mapTransitions({
		[Letters.A]: [
			[one, two],
		],
		[Letters.B]: [
			[two, one],
		],
	})

	try {
		if (transitionMap[Letters.A].get(one) !== two) {
			throw new Error('should not be here')
		}
	} catch (e) {
		throw new Error('TransitionMap throws error when getting non-existent transition')
	}
	try {
		if (transitionMap[Letters.B].get(two) !== one) {
			throw new Error('should not be here')
		}
	} catch (e) {
		throw new Error('TransitionMap throws error when getting non-existent transition')
	}
	let twoOne: any = null
	try {
		twoOne = transitionMap[Letters.B].get(one)
	} finally {
		if (twoOne) {
			throw new Error('TransitionMap throws error when getting non-existent transition')
		}
	}
	let AB: any = null
	try {
		AB = transitionMap[Letters.A].get(two)
	} finally {
		if (AB) {
			throw new Error('TransitionMap throws error when getting non-existent transition')
		}
	}
}
