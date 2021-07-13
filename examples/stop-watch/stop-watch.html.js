import { asyncReplace, html } from './lit-html.js';
//
export const getContent = (stopwatch, timer) => html `
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(timer.totaller)}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(timer.lapper)}
	</button>
`;
