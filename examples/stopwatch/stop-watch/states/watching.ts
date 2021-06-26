import { Chronograph } from './chronograph'
//
export class Watching extends Chronograph {
	isState = false
	watch = async () => {
		this.isState = true
		let time = Date.now()
		while (this.isState) {
			this.time += Date.now() - time
			time = Date.now()
			this.setState(this)
			await new Promise<void>(resolve => {
				window.requestAnimationFrame(() => resolve())
			})
		}
	}
	readonly top = () => {
		stopped.time = this.time
		stopped.lap = this.lap
		this.isState = false
		this.setState(stopped)
	}
	readonly split = () => {
		lapped.time = this.time
		lapped.lap = 0
		return this.setState(lapped)
	}
}