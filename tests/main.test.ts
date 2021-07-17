import { composeState, createProxy, createTriggers, State } from '../code/main.js'
// 
export const assertMain = async () => {
	// Triggers
	const Hello = Symbol('Hello')
	const World = Symbol('World')
	const Triggers = Object.freeze({
		Hello,
		World
	})
	type Triggers = createTriggers<typeof Triggers>
	// States
	interface Example {
		name: string
		changeState(): void
	}
	const Start = composeState<Example, Triggers>(
		class _ {
			constructor(public state: State<Triggers>) { }
			readonly name = 'Start'
			readonly changeState = () => this.state.trigger(Triggers.Hello)
		}
	)
	const End = composeState<Example, Triggers>(
		class _ {
			constructor(public state: State<Triggers>) { }
			readonly name = 'End'
			readonly changeState = () => this.state.trigger(Triggers.World)
		}
	)
	// 
	const state = new State<Triggers>(),
		start = new Start(state),
		end = new End(state)
	// 
	const currentState = createProxy<Example, Triggers>(start, {
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
