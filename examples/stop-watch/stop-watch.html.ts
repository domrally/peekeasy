import { Chronograph } from './states/chronograph.js'
import { asyncReplace, html } from './lit-html.js'
//
export const getContent = (stopwatch: Chronograph) => html`
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(stopwatch.totaller())}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(stopwatch.lapper())}
	</button>
`