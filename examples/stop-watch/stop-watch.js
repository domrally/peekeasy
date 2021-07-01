var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _stopwatch, _init, _top, _side;
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
        _stopwatch.set(this, void 0);
        // 
        _init.set(this, async () => {
            // rendering
            const styles = await getText('stop-watch.css');
            // 
            const template = html `
			<style>
				${styles}
			</style>
			<button @click="${__classPrivateFieldGet(this, _top)}">
				${asyncReplace(this.time())}
			</button>
			<button @click="${__classPrivateFieldGet(this, _side)}">
				${asyncReplace(this.lap())}
			</button>
		`;
            // 
            render(template, this);
        });
        _top.set(this, () => __classPrivateFieldGet(this, _stopwatch).top());
        _side.set(this, () => __classPrivateFieldGet(this, _stopwatch).side());
        // states
        const times = {
            total: 0,
            lap: 0
        };
        const restarted = new Restarted(times);
        const stopped = new Stopped(times);
        const watching = new Watching(times);
        // finite state pattern machine
        __classPrivateFieldSet(this, _stopwatch, CreateStateProxy(restarted, {
            [Triggers.Top]: [
                [restarted, watching],
                [watching, stopped],
                [stopped, watching]
            ],
            [Triggers.Side]: [
                [stopped, restarted]
            ]
        })
        // 
        );
        // 
        __classPrivateFieldGet(this, _init).call(this);
    }
    async *time() {
        yield toString(__classPrivateFieldGet(this, _stopwatch).total);
        for await (const [update] of __classPrivateFieldGet(this, _stopwatch)) {
            yield toString(update.total);
        }
    }
    async *lap() {
        yield toString(__classPrivateFieldGet(this, _stopwatch).lap);
        for await (const [update] of __classPrivateFieldGet(this, _stopwatch)) {
            yield toString(update.lap);
        }
    }
}
_stopwatch = new WeakMap(), _init = new WeakMap(), _top = new WeakMap(), _side = new WeakMap();
// Define the new element
customElements.define('stop-watch', StopWatch);
