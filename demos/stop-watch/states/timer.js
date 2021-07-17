var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Timer_resolveTotal, _Timer_resolveLap, _Timer_total, _Timer_lap;
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
        _Timer_resolveTotal.set(this, (_value) => { });
        _Timer_resolveLap.set(this, (_value) => { });
        _Timer_total.set(this, 0);
        _Timer_lap.set(this, 0);
    }
    set total(value) {
        __classPrivateFieldSet(this, _Timer_total, value, "f");
        __classPrivateFieldGet(this, _Timer_resolveTotal, "f").call(this, value);
    }
    get total() {
        return __classPrivateFieldGet(this, _Timer_total, "f");
    }
    set lap(value) {
        __classPrivateFieldSet(this, _Timer_lap, value, "f");
        __classPrivateFieldGet(this, _Timer_resolveLap, "f").call(this, value);
    }
    get lap() {
        return __classPrivateFieldGet(this, _Timer_lap, "f");
    }
    get totaller() {
        const target = this;
        return {
            async *[Symbol.asyncIterator]() {
                yield 'Press Me';
                while (true) {
                    const total = await new Promise(resolve => __classPrivateFieldSet(target, _Timer_resolveTotal, resolve, "f"));
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
                    const lap = await new Promise(resolve => __classPrivateFieldSet(target, _Timer_resolveLap, resolve, "f"));
                    yield toString(lap);
                }
            }
        };
    }
}
_Timer_resolveTotal = new WeakMap(), _Timer_resolveLap = new WeakMap(), _Timer_total = new WeakMap(), _Timer_lap = new WeakMap();
