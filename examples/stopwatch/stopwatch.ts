import { Mealy } from '../../src/mealy.js'
import { State } from '../../src/state.js'

abstract class Chronograph extends State<Chronograph> {
	// 
	abstract top(): void
	abstract split(): void
	// 
	time: number = 0
	lap: number = 0
}
// 
class Restarted extends Chronograph {
	readonly top = () => {
		watching.time = 0
		watching.watch()
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
		watching.watch()
		this.setState(watching)
	}
	readonly split = () => this.setState(restarted)
}
// 
class Watching extends Chronograph {
	isState = false
	watch = async () => {
		this.isState = true
		let time = Date.now()
		while (this.isState) {
			this.time = Date.now() - time
			this.setState(this)
			const getRequest = (r: any) => window.requestAnimationFrame(() => r())
			await new Promise(resolve => getRequest(resolve))
		}
	}
	readonly top = () => {
		this.isState = false
		this.setState(stopped)
	}
	readonly split = () => {
		lapped.time = this.time
		lapped.lap = 0
		return this.setState(lapped)
	}
}
// 
const restarted = new Restarted()
const watching = new Watching()
const stopped = new Stopped()
const lapped = new Lapped()
// 
const { target, handler } = new Mealy<Chronograph>(restarted)
export const stopwatch = new Proxy(target, handler)
const toString = (ms: number) => {
	let ds = ms / 100
	let ss = ds / 10
	let mn = ss / 60
	mn = Math.floor(mn)

	ss -= mn * 60
	ss = Math.floor(ss)

	ds -= mn * 60 * 10
	ds -= ss * 10
	ds = Math.round(ds)

	ms -= mn * 60 * 10 * 100
	ms -= ss * 10 * 100
	ms -= ds * 100
	ms = Math.round(ms)

	const pad = (fullNumber: number, target = 2) => {
		const last2Digits = fullNumber.toString().slice(-target)
		return last2Digits.padStart(target, '0')
	}

	return `${pad(mn)}:${pad(ss)}:${pad(ds)}:${pad(ms)}`
}
export async function* time() {
	yield toString(stopwatch.time)
	for await (const update of stopwatch) {
		yield toString(update.time)
	}
}
export async function* lap() {
	yield toString(stopwatch.lap)
	for await (const update of stopwatch) {
		yield toString(update.lap)
	}
}
