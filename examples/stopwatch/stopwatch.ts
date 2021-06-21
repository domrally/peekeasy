import { Mealy } from '../../src/mealy.js'
// 
abstract class Pinky<T> extends Promise<T> {
	readonly resolve: (value: T) => void
	readonly reject: (reason?: any) => void

	constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
		super(executor)
		this.resolve = executor.arguments[0]
		this.reject = executor.arguments[1]
	}
}

abstract class Context<S> {
	// 
	get [Symbol.asyncIterator]() {
		return this.#asyncIterator
	}
	protected readonly setState = (value: S, done = false) => {
		this.#setResult?.({ value, done })
	}
	// 
	#setResult: (result: IteratorResult<S>) => void = () => { }
	readonly #getAsyncIterator = () => {
		const promise = new Promise<IteratorResult<S>>(resolve => this.#setResult = resolve)
		const getPromise = () => promise
		const asyncIterator = { next: getPromise }
		const getAsyncIterator = () => asyncIterator
		return getAsyncIterator
	}
	#asyncIterator: () => AsyncIterator<S> = this.#getAsyncIterator()
}

abstract class Chronograph extends Context<Chronograph> implements AsyncIterable<Chronograph> {
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
