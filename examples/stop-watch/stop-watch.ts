import { Buttons } from './states/buttons.js'
import { Restarted } from './states/restarted.js'
import { Stopped } from './states/stopped.js'
import { Timer } from './states/timer.js'
import { Watching } from './states/watching.js'
import { getContent } from './stop-watch.html.js'
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
		const path = 'https://unpkg.com/mealtime'
		const { createProxy, createState } = await import(path)
		// states
		const timer = new Timer(),
			state = createState(),
			restarted = new Restarted(timer, state),
			stopped = new Stopped(timer, state),
			watching = new Watching(timer, state)
		// finite state pattern machine
		const stopwatch = createProxy(restarted, {
			[Buttons.Top]: [
				[restarted, watching],
				[watching, stopped],
				[stopped, watching]
			],
			[Buttons.Side]: [
				[stopped, restarted]
			]
		})
		// rendering
		const content = await getContent(stopwatch, timer)

		let url = 'https://unpkg.com/lit-html?module'
		const { html, render } = await import(url)

		const response = await fetch('stop-watch.css')
		const styles = await response.text()
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
