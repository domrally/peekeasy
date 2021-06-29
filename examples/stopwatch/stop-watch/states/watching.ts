import { Triggers } from '../triggers'
import { Chronograph } from './chronograph'
//
export class Watching extends Chronograph {
	#isTiming = false
	async onEnter() {
		this.#isTiming = true
		this.timer = this._timer
		for await (const delta of this.timer()) {
			this.times.total += delta
		}
	}
	onExit() {
		this.#isTiming = false
	}
	private async *_timer() {
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
		yield* this._timer()
	}
	readonly top = () => this.raise(Triggers.Top)
	readonly side = async () => {
		this.times.lap = this.times.total - this.times.lap
	}
}