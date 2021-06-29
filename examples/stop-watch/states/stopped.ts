import { Chronograph } from './chronograph.js'
import { Triggers } from './triggers.js'
// 
export class Stopped extends Chronograph {
	onEnter() {
	}
	onExit() {
	}
	readonly top = () => this.raise(Triggers.Top)
	readonly side = () => this.raise(Triggers.Side)
}