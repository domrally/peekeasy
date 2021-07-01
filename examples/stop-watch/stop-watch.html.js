import { asyncReplace, html } from './lit-html.js';
//
export const getContent = (stopwatch) => html `
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(stopwatch.totaller())}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(stopwatch.lapper())}
	</button>
`;
