import { Triggers } from '../triggers'
import { Chronograph } from './chronograph'
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