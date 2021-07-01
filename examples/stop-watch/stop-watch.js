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
// 
const asyncReplace = window.asyncReplace;
const html = window.html;
const render = window.render;
//
const getText = async (url) => {
    const response = await fetch(url);
    return await response.text();
};
// 
const toString = (ms) => {
    let cs = ms / 10;
    let ss = cs / 100;
    let mn = ss / 60;
    mn = Math.floor(mn);
    ss -= mn * 60;
    ss = Math.floor(ss);
    cs -= mn * 60 * 100;
    cs -= ss * 100;
    cs = Math.round(cs);
    const pad = (fullNumber, target = 2) => {
        const last2Digits = fullNumber.toString().slice(-target);
        return last2Digits.padStart(target, '0');
    };
    return `${pad(mn)}:${pad(ss)}:${pad(cs)}`;
};
// 
export class StopWatch extends HTMLElement {
    // 
    constructor() {
        super();
        // 
        _init.set(this, async () => {
            let resolveTotal;
            let resolveLap;
            let _total = 0, _lap = 0;
            const times = {
                set total(value) {
                    _total = value;
                    resolveTotal(value);
                },
                get total() {
                    return _total;
                },
                set lap(value) {
                    _lap = value;
                    resolveLap(value);
                },
                get lap() {
                    return _lap;
                },
                async *totaller() {
                    yield toString(0);
                    while (true) {
                        const total = await new Promise(resolve => resolveTotal = resolve);
                        yield toString(total);
                    }
                },
                async *lapper() {
                    yield toString(0);
                    while (true) {
                        const lap = await new Promise(resolve => resolveLap = resolve);
                        yield toString(lap);
                    }
                }
            };
            // states
            const restarted = new Restarted(times);
            const stopped = new Stopped(times);
            const watching = new Watching(times);
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
            const styles = await getText('stop-watch.css');
            // 
            const template = html `
			<style>
				${styles}
			</style>
			<button @click="${() => stopwatch.top()}">
				${asyncReplace(times.totaller())}
			</button>
			<button @click="${() => stopwatch.side()}">
				${asyncReplace(times.lapper())}
			</button>
		`;
            // 
            render(template, this);
        });
        // 
        __classPrivateFieldGet(this, _init).call(this);
    }
}
_init = new WeakMap();
// Define the new element
customElements.define('stop-watch', StopWatch);
