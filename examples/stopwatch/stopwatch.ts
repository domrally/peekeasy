import { Mealy } from '../../src/mealy.js'
// 
abstract class Pinky<T> {

	readonly promise: PromiseLike<T>
	readonly resolve: (value: T) => void
	readonly reject: (reason?: any) => void

	constructor() {
		let res: (value: T) => void = () => { }
		let rej: (reason?: any) => void = () => { }

		this.promise = new Promise((resolve, reject) => {
			res = resolve
			rej = reject
		})
		this.resolve = res
		this.reject = rej
	}
}

abstract class Chronograph implements AsyncIterable<Chronograph> {
	// 
	get [Symbol.asyncIterator]() {
		return this.#asyncIterator
	}
	protected readonly setState = (value: Chronograph, done = false) => {
		this.#setResult?.({ value, done })
	}
	// 
	#setResult: (result: IteratorResult<Chronograph>) => void = () => { }
	readonly #getAsyncIterator = () => {
		const promise = new Promise<IteratorResult<Chronograph>>(resolve => this.#setResult = resolve)
		const getPromise = () => promise
		const asyncIterator = { next: getPromise }
		const getAsyncIterator = () => asyncIterator
		return getAsyncIterator
	}
	#asyncIterator: () => AsyncIterator<Chronograph> = this.#getAsyncIterator()
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
		watching.milliseconds = 0
		// watching.watch()
		this.setState(watching)
	}
	readonly split = () => { }
}
// 
class Lapped extends Chronograph {
	readonly top = () => this.setState(stopped)
	readonly split = () => this.setState(watching)
}
// 
class Stopped extends Chronograph {
	readonly top = () => {
		// watching.watch()
		this.setState(watching)
	}
	readonly split = () => this.setState(restarted)
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
		this.setState(this)
		const getRequest = (r: any) => window.requestAnimationFrame(() => r())
		await new Promise(resolve => getRequest(resolve))
		return Date.now()
	}
	readonly top = () => {
		// this.updating = Promise.resolve()
		this.setState(stopped)
	}
	readonly split = () => {
		lapped.milliseconds = this.milliseconds
		return this.setState(lapped)
	}
}
// 
const restarted = new Restarted()
const watching = new Watching()
const stopped = new Stopped()
const lapped = new Lapped()
// 
const { target, handler } = new Mealy<Chronograph>(restarted, watching, stopped, lapped)
export const stopwatch = new Proxy(target, handler)
