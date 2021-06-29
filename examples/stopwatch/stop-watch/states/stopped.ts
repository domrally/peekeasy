import { Triggers } from '../triggers'
import { Chronograph } from './chronograph'
// 
export class Stopped extends Chronograph {
	onEnter() {
	}
	onExit() {
	}
	readonly top = () => this.raise(Triggers.Top)
	readonly side = () => this.raise(Triggers.Side)
}