//
export const getContent = async (stopwatch, timer) => {
    let url = 'https://unpkg.com/lit-html?module';
    const { html } = await import(url);
    url = 'https://unpkg.com/lit-html/directives/async-replace?module';
    const { asyncReplace } = await import(url);
    return html `
		<button @click="${() => stopwatch.top()}">
			${asyncReplace(timer.totaller)}
		</button>
		<button @click="${() => stopwatch.side()}">
			${asyncReplace(timer.lapper)}
		</button>
		`;
};
