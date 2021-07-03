import { State } from '../src/state.js'
import { TransitionMap, Transitions } from '../src/transitions.js'

enum Triggers {
	A,
	B,
}
class MyState extends State<MyState, Triggers> {
	onEnter() { }
	onExit() { }
}
class A extends MyState { }
class B extends MyState { }
const a = new A(),
	b = new B(),
	transitions: Transitions<MyState> = {
		[Triggers.A]: [
			[a, b],
		],
		[Triggers.B]: [
			[b, a],
		],
	}
const transitionMap = new TransitionMap<MyState, Triggers>(transitions)

export const assertTransitions = () => {
	try {
		if (transitionMap.get(Triggers.A)?.get(a) !== b) {
			throw new Error('should not be here')
		}
	} catch (e) {
		throw new Error('TransitionMap throws error when getting non-existent transition')
	}
	try {
		if (transitionMap.get(Triggers.B)?.get(b) !== a) {
			throw new Error('should not be here')
		}
	} catch (e) {
		throw new Error('TransitionMap throws error when getting non-existent transition')
	}
	let BA: MyState | null | undefined = null
	try {
		BA = transitionMap.get(Triggers.B)?.get(a)
	} finally {
		if (BA) {
			throw new Error('TransitionMap throws error when getting non-existent transition')
		}
	}
	let AB: MyState | null | undefined = null
	try {
		AB = transitionMap.get(Triggers.A)?.get(b)
	} finally {
		if (AB) {
			throw new Error('TransitionMap throws error when getting non-existent transition')
		}
	}
}
