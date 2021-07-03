import { Chronograph } from './chronograph.js'
import { Triggers } from './triggers.js'
//
export class Restarted extends Chronograph {
	onEnter(): void {
		this.times.lap = 0
		this.times.total = 0
	}
	onExit(): void {
	}
	readonly top = () => this.trigger(Triggers.Top)
	side() { }
}