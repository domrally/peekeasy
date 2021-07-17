import { compose, events, mealtime, State } from '../code/mealtime.js'
// 
export const assertMealtime = async () => {
	// Triggers
	const Hello = Symbol('Hello')
	const World = Symbol('World')
	type Triggers = events<typeof Triggers>
	const Triggers = Object.freeze({
		Hello,
		World
	})
	// States
	interface Example {
		name: string
		changeState(): void
	}
	const Start = compose<Example, Triggers>(
		class _ {
			constructor(public state: State<Triggers>) { }
			readonly name = 'Start'
			readonly changeState = () => this.state.trigger(Triggers.Hello)
		}
	)
	const End = compose<Example, Triggers>(
		class _ {
			constructor(public state: State<Triggers>) { }
			readonly name = 'End'
			readonly changeState = () => this.state.trigger(Triggers.World)
		}
	)
	// 
	const state = State<Triggers>(),
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

	const logLoop = async () => {
		for await (const t of currentState) {
			return
		}
	}
	const eventLoop = async () => {
		while (true) {
			await new Promise<void>(resolve => setTimeout(() => {
				currentState.changeState()
				resolve()
			}, 1))
			return
		}
	}

	await Promise.all([logLoop(), eventLoop()])
}
