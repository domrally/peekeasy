import { Chronograph } from './states/chronograph.js'
import { Triggers } from './triggers.js'
import { Restarted } from './states/restarted.js'
import { Watching } from './states/watching.js'
import { Stopped } from './states/stopped.js'
import { CreateStateProxy } from '../../../src/main.js'
// 
export class StopWatch extends HTMLElement {
	#stopwatch: Chronograph
	// 
	constructor() {
		super()
		// states
		const times = {
			total: 0,
			lap: 0
		}
		const restarted = new Restarted(times)
		const stopped = new Stopped(times)
		const watching = new Watching(times)
		// transitions
		const transitions = new Map<[Chronograph, Triggers], Chronograph>()
		transitions.set([restarted, Triggers.Top], watching)
		transitions.set([watching, Triggers.Top], stopped)
		transitions.set([stopped, Triggers.Top], watching)
		transitions.set([stopped, Triggers.Side], restarted)
		// finite state pattern machine
		this.#stopwatch = CreateStateProxy<Chronograph, Triggers>(restarted, transitions)
		// 
		this.#init()
	}
	// 
	readonly #init = async () => {
		// rendering
		const [styles, content] = await Promise.all([
			getText('./stop-watch.css'),
			getText('./stop-watch.html')
		])
		// 
		const template = (window as any).html`
			<style>
				${styles}
			</style>
			${content}
		`
		// 
		while (!document.getElementsByClassName('stop-watch').length) {
			await new Promise<void>(resolve => window.requestAnimationFrame(() => resolve()))
		}
		const container = document.getElementsByClassName('stop-watch')[0];
		// 
		(window as any).render(template, container)
	}
	private async *time() {
		yield toString(this.#stopwatch.total)
		for await (const [update] of this.#stopwatch) {
			yield toString(update.total)
		}
	}
	private async *lap() {
		yield toString(this.#stopwatch.lap)
		for await (const [update] of this.#stopwatch) {
			yield toString(update.lap)
		}
	}
	readonly #top = () => this.#stopwatch.top()
	readonly #side = () => this.#stopwatch.side()
}
// Define the new element
customElements.define('stop-watch', StopWatch)
// 
const getText = async (url: string) => {
	const response = await fetch(url)
	return response.text
}
// 
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