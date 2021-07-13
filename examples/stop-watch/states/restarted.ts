import { Buttons } from './buttons.js'
import { Timer } from './timer.js'
//
const path = 'https://unpkg.com/mealtime'
const { composeState } = await import(path)

export const Restarted = composeState(
	class _ {
		constructor(public times: Timer, public state: any) { }
		onEnter(): void {
			this.times.lap = 0
			this.times.total = 0
		}
		readonly top = () => this.state.trigger(Buttons.Top)
		side() { }
	}
)
