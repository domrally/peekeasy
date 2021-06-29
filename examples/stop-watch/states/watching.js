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
var _isTiming;
import { Chronograph } from './chronograph.js';
import { Triggers } from './triggers.js';
//
export class Watching extends Chronograph {
    constructor() {
        super(...arguments);
        _isTiming.set(this, false);
        this.top = () => this.raise(Triggers.Top);
        this.side = async () => {
            this.times.lap = this.times.total - this.times.lap;
        };
    }
    async onEnter() {
        __classPrivateFieldSet(this, _isTiming, true);
        this.timer = this._timer;
        for await (const delta of this.timer()) {
            this.times.total += delta;
        }
    }
    onExit() {
        __classPrivateFieldSet(this, _isTiming, false);
    }
    async *_timer() {
        delete this.timer;
        while (__classPrivateFieldGet(this, _isTiming)) {
            const old = Date.now();
            await new Promise(resolve => {
                requestAnimationFrame(() => resolve());
            });
            const now = Date.now();
            yield now - old;
        }
    }
    async *timer() {
        yield* this._timer();
    }
}
_isTiming = new WeakMap();
