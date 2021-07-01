import { Chronograph } from './states/chronograph.js'
import { Triggers } from './states/triggers.js'
import { Restarted } from './states/restarted.js'
import { Watching } from './states/watching.js'
import { Stopped } from './states/stopped.js'
import { CreateStateProxy } from '../../src/main.js'
// 
const asyncReplace = (window as any).asyncReplace
const html = (window as any).html
const render = (window as any).render
//
const getText = async (url: string) => {
	const response = await fetch(url)
	return await response.text()
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
// 
export class StopWatch extends HTMLElement {
	// 
	constructor() {
		super()
		// 
		this.#init()
	}
	// 
	readonly #init = async () => {
		let resolveTotal: (value: number) => void
		let resolveLap: (value: number) => void

		let _total = 0,
			_lap = 0
		const times = {
			set total(value: number) {
				_total = value
				resolveTotal(value)
			},
			get total() {
				return _total
			},
			set lap(value: number) {
				_lap = value
				resolveLap(value)
			},
			get lap() {
				return _lap
			},
			async *totaller(): AsyncIterator<string> {
				yield 'Press Me'
				while (true) {
					const total = await new Promise<number>(resolve => resolveTotal = resolve)
					yield toString(total)
				}
			},
			async *lapper(): AsyncIterator<string> {
				yield 'Split Me'
				while (true) {
					const lap = await new Promise<number>(resolve => resolveLap = resolve)
					yield toString(lap)
				}
			}
		}
		// states
		const restarted = new Restarted(times)
		const stopped = new Stopped(times)
		const watching = new Watching(times)
		// finite state pattern machine
		const stopwatch = CreateStateProxy<Chronograph, Triggers>(restarted, {
			[Triggers.Top]: [
				[restarted, watching],
				[watching, stopped],
				[stopped, watching]
			],
			[Triggers.Side]: [
				[stopped, restarted]
			]
		})
		// rendering
		const styles = await getText('stop-watch.css')
		// 
		const template = html`
			<style>
				${styles}
			</style>
			<button @click="${() => stopwatch.top()}">
				${asyncReplace(times.totaller())}
			</button>
			<button @click="${() => stopwatch.side()}">
				${asyncReplace(times.lapper())}
			</button>
		`
		// 
		render(template, this)
	}
}
// Define the new element
customElements.define('stop-watch', StopWatch)
