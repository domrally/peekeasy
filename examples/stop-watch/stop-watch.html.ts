import { asyncReplace, html } from './lit-html.js'
import { Chronograph } from './states/chronograph.js'
import { Timer } from './states/timer.js'
//
export const getContent = (stopwatch: Chronograph, timer: Timer) => html`
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(timer.totaller)}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(timer.lapper)}
	</button>
`