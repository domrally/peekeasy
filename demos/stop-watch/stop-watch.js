var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StopWatch_init;
import { Buttons } from './states/buttons.js';
import { Restarted } from './states/restarted.js';
import { Stopped } from './states/stopped.js';
import { Timer } from './states/timer.js';
import { Watching } from './states/watching.js';
import { getContent } from './stop-watch.html.js';
// 
export class StopWatch extends HTMLElement {
    // 
    constructor() {
        super();
        // 
        _StopWatch_init.set(this, async () => {
            const path = 'https://unpkg.com/mealtime';
            const { mealtime, State } = await import(path);
            // states
            const timer = new Timer(), state = State(), restarted = new Restarted(timer, state), stopped = new Stopped(timer, state), watching = new Watching(timer, state);
            // finite state pattern machine
            const stopwatch = mealtime(restarted, {
                [Buttons.Top]: [
                    [restarted, watching],
                    [watching, stopped],
                    [stopped, watching]
                ],
                [Buttons.Side]: [
                    [stopped, restarted]
                ]
            });
            // rendering
            const content = await getContent(stopwatch, timer);
            let url = 'https://unpkg.com/lit-html?module';
            const { html, render } = await import(url);
            const response = await fetch('stop-watch.css');
            const styles = await response.text();
            // merge style and content
            const template = html `
			<style>
				${styles}
			</style>
			${content}
		`;
            render(template, this);
        });
        // 
        __classPrivateFieldGet(this, _StopWatch_init, "f").call(this);
    }
}
_StopWatch_init = new WeakMap();
// Define the new element
customElements.define('stop-watch', StopWatch);
