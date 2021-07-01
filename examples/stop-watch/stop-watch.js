var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _init;
import { Triggers } from './states/triggers.js';
import { Restarted } from './states/restarted.js';
import { Watching } from './states/watching.js';
import { Stopped } from './states/stopped.js';
import { CreateStateProxy } from '../../src/main.js';
import { getContent, html, render } from './stop-watch.html.js';
import { Timer } from './timer.js';
// 
export class StopWatch extends HTMLElement {
    // 
    constructor() {
        super();
        // 
        _init.set(this, async () => {
            const timer = new Timer();
            // states
            const restarted = new Restarted(timer);
            const stopped = new Stopped(timer);
            const watching = new Watching(timer);
            // finite state pattern machine
            const stopwatch = CreateStateProxy(restarted, {
                [Triggers.Top]: [
                    [restarted, watching],
                    [watching, stopped],
                    [stopped, watching]
                ],
                [Triggers.Side]: [
                    [stopped, restarted]
                ]
            });
            // rendering
            const response = await fetch('stop-watch.css');
            const styles = await response.text();
            const content = getContent(stopwatch, timer);
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
        __classPrivateFieldGet(this, _init).call(this);
    }
}
_init = new WeakMap();
// Define the new element
customElements.define('stop-watch', StopWatch);
