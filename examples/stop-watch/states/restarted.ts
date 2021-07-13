import { composeState } from '../mealtime.js'
import { Buttons } from './buttons.js'
import { Chronograph } from './chronograph.js'
import { Timer } from './timer.js'
//
export const Restarted = composeState<Chronograph, Buttons>(
	class _ {
		constructor(public state: Timer) { }
		onEnter(): void {
			this.state.lap = 0
			this.state.total = 0
		}
		readonly top = () => this.state.trigger(Buttons.Top)
		side() { }
	}
)
