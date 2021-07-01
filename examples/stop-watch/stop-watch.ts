import { Chronograph } from './states/chronograph.js'
import { Triggers } from './states/triggers.js'
import { Restarted } from './states/restarted.js'
import { Watching } from './states/watching.js'
import { Stopped } from './states/stopped.js'
import { CreateStateProxy } from '../../src/main.js'
import { getContent } from './stop-watch.html.js'
import { html, render } from './lit-html.js'
import { Timer } from './states/timer.js'
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
		const timer = new Timer()
		// states
		const restarted = new Restarted(timer)
		const stopped = new Stopped(timer)
		const watching = new Watching(timer)
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
		const response = await fetch('stop-watch.css')
		const styles = await response.text()
		const content = getContent(stopwatch)
		// merge style and content
		const template = html`
			<style>
				${styles}
			</style>
			${content}
		`
		render(template, this)
	}
}
// Define the new element
customElements.define('stop-watch', StopWatch)
