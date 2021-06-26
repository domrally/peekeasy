import { Chronograph } from './chronograph'
//
export class Restarted extends Chronograph {
	readonly top = () => {
		this.raise(Triggers.Start)
		watching.time = 0
		watching.watch()
	}
	readonly split = () => { }
}