import { State } from './state'
import { WeakState } from './weak-state'

class Context {
	#state = State({ value: 'hello' })
	state = WeakState(this.#state)

	update() {
		this.#state({ value: 'world' })
	}
}

const context = new Context()

const { state } = context

console.log(state.value)
context.update()
console.log(state.value)