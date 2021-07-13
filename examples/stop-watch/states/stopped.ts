import { composeState } from '../mealtime.js'
import { Buttons } from './buttons.js'
import { Chronograph } from './chronograph.js'
import { Timer } from './timer.js'
// 
export const Stopped = composeState<Chronograph, Buttons>(
	class _ {
		constructor(public state: Timer) { }
		readonly top = () => this.state.trigger(Buttons.Top)
		readonly side = () => this.state.trigger(Buttons.Side)
	}
)
