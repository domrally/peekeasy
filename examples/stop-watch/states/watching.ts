import { Buttons } from './buttons.js'
import { Timer } from './timer.js'
const path = 'https://unpkg.com/mealtime'
const { composeState } = await import(path)
//
export const Watching = composeState(
	class _ {
		#isTiming = false
		constructor(public times: Timer, public state: any) { }
		async onEnter() {
			this.#isTiming = true
			this.timer = this.#timer
			for await (const delta of this.timer?.()) {
				this.times.total += delta
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
			this.times.lap = this.times.total - this.times.lap
		}
	}
)
