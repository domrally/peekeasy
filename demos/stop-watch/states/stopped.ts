import { Buttons } from './buttons.js'
import { Timer } from './timer.js'
const path = 'https://unpkg.com/mealtime'
const { composeState } = await import(path)
// 
export const Stopped = composeState(
	class _ {
		constructor(public _timer: Timer, public state: any) { }
		readonly top = () => this.state.trigger(Buttons.Top)
		readonly side = () => this.state.trigger(Buttons.Side)
	}
)
