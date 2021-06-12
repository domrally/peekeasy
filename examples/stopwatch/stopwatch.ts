import { Mealy } from '../../src/mealy.js'
// 
class Pinky<T> extends Promise<T> {
	resolve: (value: T) => void
	reject: (reason?: any) => void
	constructor(
		res: (value: T) => void = () => { },
		rej: (reason?: any) => void = () => { }
	) {
		super((resolve, reject) => {
			res = resolve
			rej = reject
		})
		this.resolve = res
		this.reject = rej
	}
}

abstract class Chronograph extends Pinky<Chronograph> {
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
}
// 
class Restarted extends Chronograph {
	readonly top = () => {
		const watching = new Watching()
		watching.milliseconds = 0
		watching.watch()
		this.resolve(watching)
	}
	readonly split = () => { }
}
// 
class Lapped extends Chronograph {
	readonly top = () => this.resolve(new Stopped())
	readonly split = () => this.resolve(new Watching())
}
// 
class Stopped extends Chronograph {
	readonly top = () => {
		const watching = new Watching()
		watching.watch()
		this.resolve(watching)
	}
	readonly split = () => this.resolve(restarted)
}
// 
class Watching extends Chronograph {
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
		const newWatching = new Watching(this.resolve, this.reject)
		this.resolve(newWatching)
		const getRequest = (r: any) => window.requestAnimationFrame(() => r())
		await new Promise(resolve => getRequest(resolve))
		return Date.now()
	}
	readonly top = () => {
		this.updating = Promise.resolve()
		this.resolve(new Stopped())
	}
	readonly split = () => {
		const lapped = new Lapped()
		lapped.milliseconds = this.milliseconds
		return this.resolve(lapped)
	}
}
// 
const restarted = new Restarted()
// 
const { target, handler } = new Mealy<Chronograph>(restarted)
export const stopwatch = new Proxy(target, handler)
