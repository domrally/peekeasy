import { Chronograph } from './chronograph'
// 
export class Stopped extends Chronograph {
	readonly top = () => {
		watching.watch()
		this.setState(watching)
	}
	readonly split = () => this.setState(restarted)
}