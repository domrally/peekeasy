import { Chronograph } from './states/chronograph.js'
import { Timer } from './timer.js'
// 
export const asyncReplace = (window as any).asyncReplace
export const html = (window as any).html
export const render = (window as any).render
//
export const getContent = (stopwatch: Chronograph, timer: Timer) => html`
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(timer.totaller())}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(timer.lapper())}
	</button>
`