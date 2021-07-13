import { composeState } from '../mealtime.js'
import { Buttons } from './buttons.js'
import { Chronograph } from './chronograph.js'
import { Timer } from './timer.js'
//
export const Watching = composeState<Chronograph, Buttons>(
	class _ {
		#isTiming = false
		constructor(public state: Timer) { }
		async onEnter() {
			this.#isTiming = true
			this.timer = this.#timer
			for await (const delta of this.timer?.()) {
				this.state.total += delta
			}
		}
		onExit() {
			this.#isTiming = false
		}
		async *#timer() {
			delete this.timer
			while (this.#isTiming) {
				const old = Date.now()
				await new Promise<void>(resolve => {
					requestAnimationFrame(() => resolve())
				})
				const now = Date.now()
				yield now - old
			}
		}
		async *timer?() {
			yield* this.#timer()
		}
		readonly top = () => this.state.trigger(Buttons.Top)
		readonly side = async () => {
			this.state.lap = this.state.total - this.state.lap
		}
	}
)
