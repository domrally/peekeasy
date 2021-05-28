import { Mealy } from '../../src/mealy.js'
import { createState } from '../../src/state.js'
// 
abstract class Chronograph {
	// 
	abstract top(): void
	abstract split(): void
	// 
	milliseconds: number = 0
	readonly toString = () => {
		let ms = this.milliseconds
		let ss = ms / 1000
		let mn = ss / 60

		mn = Math.floor(mn)
		ss -= Math.floor(mn * 60)
		ms -= mn * 60 * 1000
		ms -= ss * 1000

		return `${mn}:${ss}:${ms}`
	}
	// 
	resolve(_nextState: Chronograph) { }
	promise = Promise.reject()
}
// 
const Restarted = createState(
	class _Restarted extends Chronograph {
		constructor() {
			super()
			this.milliseconds = 0
		}
		readonly top = () => {
			watching.milliseconds = 0
			watching.watch()
			this.resolve(watching)
		}
		readonly split = () => { }
	}
)
// 
const Lapped = createState(
	class _Lapped extends Chronograph {
		readonly top = () => this.resolve(stopped)
		readonly split = () => this.resolve(watching)
	}
)
// 
const Stopped = createState(
	class _Stopped extends Chronograph {
		readonly top = () => {
			watching.watch()
			this.resolve(watching)
		}
		readonly split = () => this.resolve(restarted)
	}
)
// 
const Watching = createState(
	class _Watching extends Chronograph {
		private updating: Promise<void> = Promise.resolve()
		update = async () => {
			const u = this.updating
			let time = Date.now()
			while (u === this.updating) {
				time = await this.loop(time)
			}
		}
		watch = () => {
			this.updating = this.update()
		}
		private loop = async (time: number) => {
			this.milliseconds += Date.now() - time
			this.resolve(this)
			const getRequest = (r: any) => window.requestAnimationFrame(() => r())
			await new Promise(resolve => getRequest(resolve))
			return Date.now()
		}
		readonly top = () => {
			this.updating = Promise.resolve()
			this.resolve(stopped)
		}
		readonly split = () => {
			lapped.milliseconds = this.milliseconds
			return this.resolve(lapped)
		}
	}
)
// 
const restarted = new Restarted()
const lapped = new Lapped()
const stopped = new Stopped()
const watching = new Watching()
// 
const { target, handler } = new Mealy<Chronograph>(restarted, lapped, stopped, watching)
export const stopwatch = new Proxy(target, handler)
