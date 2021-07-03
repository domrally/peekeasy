import { Chronograph } from './chronograph.js'
import { Triggers } from './triggers.js'
// 
export class Stopped extends Chronograph {
	onEnter() {
	}
	onExit() {
	}
	readonly top = () => this.trigger(Triggers.Top)
	readonly side = () => this.trigger(Triggers.Side)
}