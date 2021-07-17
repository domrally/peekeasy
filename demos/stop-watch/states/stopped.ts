import { Buttons } from './buttons.js'
import { Timer } from './timer.js'
const path = 'https://unpkg.com/mealtime'
const { compose } = await import(path)
// 
export const Stopped = compose(class _ {
	constructor(public _timer: Timer, public state: any) { }
	readonly top = () => this.state.trigger(Buttons.Top)
	readonly side = () => this.state.trigger(Buttons.Side)
})
