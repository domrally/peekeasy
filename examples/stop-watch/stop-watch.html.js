// 
export const asyncReplace = window.asyncReplace;
export const html = window.html;
export const render = window.render;
//
export const getContent = (stopwatch, timer) => html `
	<button @click="${() => stopwatch.top()}">
		${asyncReplace(timer.totaller())}
	</button>
	<button @click="${() => stopwatch.side()}">
		${asyncReplace(timer.lapper())}
	</button>
`;
