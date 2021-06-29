import { Triggers } from '../triggers.js'
import { Chronograph } from './chronograph.js'
//
export class Restarted extends Chronograph {
	onEnter(): void {
		this.times.lap = 0
		this.times.total = 0
	}
	onExit(): void {
	}
	readonly top = () => this.raise(Triggers.Top)
	side() { }
}