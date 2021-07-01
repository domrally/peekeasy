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
var _resolveTotal, _resolveLap, _total, _lap;
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
export class Timer {
    constructor() {
        _resolveTotal.set(this, (_value) => { });
        _resolveLap.set(this, (_value) => { });
        _total.set(this, 0);
        _lap.set(this, 0);
    }
    set total(value) {
        __classPrivateFieldSet(this, _total, value);
        __classPrivateFieldGet(this, _resolveTotal).call(this, value);
    }
    get total() {
        return __classPrivateFieldGet(this, _total);
    }
    set lap(value) {
        __classPrivateFieldSet(this, _lap, value);
        __classPrivateFieldGet(this, _resolveLap).call(this, value);
    }
    get lap() {
        return __classPrivateFieldGet(this, _lap);
    }
    get totaller() {
        const target = this;
        return {
            async *[Symbol.asyncIterator]() {
                yield 'Press Me';
                while (true) {
                    const total = await new Promise(resolve => __classPrivateFieldSet(target, _resolveTotal, resolve));
                    yield toString(total);
                }
            }
        };
    }
    get lapper() {
        const target = this;
        return {
            async *[Symbol.asyncIterator]() {
                yield 'Split Me';
                while (true) {
                    const lap = await new Promise(resolve => __classPrivateFieldSet(target, _resolveLap, resolve));
                    yield toString(lap);
                }
            }
        };
    }
}
_resolveTotal = new WeakMap(), _resolveLap = new WeakMap(), _total = new WeakMap(), _lap = new WeakMap();
