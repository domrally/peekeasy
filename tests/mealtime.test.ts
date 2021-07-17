import { compose, mealtime, State } from '../code/mealtime.js'
// 
export const assertMealtime = async () => {

	const Hello = Symbol('Hello'),
		World = Symbol('World'),
		Triggers = Object.freeze({
			Hello,
			World
		} as const)
	type Triggers = typeof Triggers

	interface Example {
		name: string
		changeState(): void
	}

	const Start = compose(class _ {
		constructor(public state: State<Triggers>) { }
		readonly name = 'Start'
		readonly changeState = () => this.state.trigger(Triggers.Hello)
	})
	const End = compose(class _ {
		constructor(public state: State<Triggers>) { }
		readonly name = 'End'
		readonly changeState = () => this.state.trigger(Triggers.World)
	})
	// 
	const state = State(),
		start = new Start(state),
		end = new End(state)
	// 
	const currentState = mealtime<Example, Triggers>(start, {
		[Triggers.Hello]: [
			[start, end]
		],
		[Triggers.World]: [
			[end, start]
		]
	})
	// start the machine
	const loop = async () => {
		if (currentState.name !== 'Start') {
			throw new Error('currentState.name !== "Start"')
		}
		for await (const _ of currentState) {
			if (currentState.name === 'Start') {
				throw new Error('currentState.name !== "End"')
			}
			return
		}
	}
	loop()
	currentState.changeState()
}
