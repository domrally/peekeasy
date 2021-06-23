import { Mealy } from '../../src/mealy.js'
import { State } from '../../src/state.js'

abstract class Chronograph extends State<Chronograph> {
	// 
	abstract top(): void
	abstract split(): void
	// 
	time = 0
	lap = 0
}
// 
class Restarted extends Chronograph {
	readonly top = () => {
		this.setState(watching)
		watching.time = 0
		watching.watch()
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
			this.time += Date.now() - time
			time = Date.now()
			this.setState(this)
			const getRequest = (r: any) => window.requestAnimationFrame(() => r())
			await new Promise(resolve => getRequest(resolve))
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
// 
const restarted = new Restarted()
const watching = new Watching()
const stopped = new Stopped()
const lapped = new Lapped()
// 
const { target, handler } = new Mealy<Chronograph>(restarted)
export const stopwatch = new Proxy(target, handler)
const toString = (ms: number) => {
	let cs = ms / 10
	let ss = cs / 100
	let mn = ss / 60
	mn = Math.floor(mn)

	ss -= mn * 60
	ss = Math.floor(ss)

	cs -= mn * 60 * 100
	cs -= ss * 100
	cs = Math.round(cs)

	const pad = (fullNumber: number, target = 2) => {
		const last2Digits = fullNumber.toString().slice(-target)
		return last2Digits.padStart(target, '0')
	}

	return `${pad(mn)}:${pad(ss)}:${pad(cs)}`
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
