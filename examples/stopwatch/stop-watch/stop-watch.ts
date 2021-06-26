import { html, render } from 'https://unpkg.com/lit-html?module'
import { asyncReplace } from 'https://unpkg.com/lit-html/directives/async-replace?module'
import { Chronograph } from './states/chronograph'
import { Mealy } from '../../..'
import { Triggers } from './triggers'
import { Restarted } from './states/restarted'
import { Watching } from './states/watching'
import { Stopped } from './states/stopped'
import { Lapped } from './states/lapped'
// 
export class StopWatch extends HTMLElement {
	#stopwatch: Chronograph
	// 
	constructor() {
		super()
		// 
		const restarted = new Restarted()
		const watching = new Watching()
		const stopped = new Stopped()
		const lapped = new Lapped()
		// 
		const triggers = new Map<[Triggers, Chronograph], Chronograph>()
		triggers.set([Triggers.Start, restarted], watching)
		triggers.set([Triggers.Start, stopped], watching)
		triggers.set([Triggers.Stop, restarted], watching)
		triggers.set([Triggers.Reset, stopped], restarted)

		this.#stopwatch = Mealy<Chronograph, Triggers>(restarted, triggers)
		this.#init()
	}
	// 
	readonly #init = async () => {
		const [styles, content] = await Promise.all([
			StopWatch.#getText('./stop-watch.css'),
			StopWatch.#getText('./stop-watch.html')
		])
		// 
		const template = html`
			<style>
				${styles}
			</style>
			${content}
		`
		// 
		while (!document.getElementsByClassName('stop-watch').length) {
			await new Promise<void>(resolve => window.requestAnimationFrame(() => resolve()))
		}
		const container = document.getElementsByClassName('stop-watch')[0]
		// 
		render(template, container)
	}

	// 
	static readonly #getText = async (url: string) => {
		const response = await fetch(url)
		return response.text
	}
	// 
	readonly #toString = (ms: number) => {
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
	async *time() {
		yield this.#toString(this.#stopwatch.time)
		for await (const update of this.#stopwatch) {
			yield this.#toString(update.time)
		}
	}
	async *lap() {
		yield this.#toString(this.#stopwatch.lap)
		for await (const update of this.#stopwatch) {
			yield this.#toString(update.lap)
		}
	}
	readonly top = () => this.#stopwatch.top()
	readonly split = () => this.#stopwatch.split()
}
// Define the new element
customElements.define('stop-watch', StopWatch)

// 	start: {
// 		restarted: watching,
// 	},
// 	stop: [
// 		[watching, stopped],
// 	],
// 	reset: [
// 		[stopped, restarted],
// 	],
// }
