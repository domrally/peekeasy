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
var ___instances, ___isTiming, ___timer, _a;
import { Buttons } from './buttons.js';
const path = 'https://unpkg.com/mealtime';
const { composeState } = await import(path);
//
export const Watching = composeState((_a = class _ {
        constructor(times, state) {
            this.times = times;
            this.state = state;
            ___instances.add(this);
            ___isTiming.set(this, false);
            this.top = () => this.state.trigger(Buttons.Top);
            this.side = async () => {
                this.times.lap = this.times.total - this.times.lap;
            };
        }
        async onEnter() {
            __classPrivateFieldSet(this, ___isTiming, true, "f");
            this.timer = __classPrivateFieldGet(this, ___instances, "m", ___timer);
            for await (const delta of this.timer?.()) {
                this.times.total += delta;
            }
        }
        onExit() {
            __classPrivateFieldSet(this, ___isTiming, false, "f");
        }
        async *timer() {
            yield* __classPrivateFieldGet(this, ___instances, "m", ___timer).call(this);
        }
    },
    ___isTiming = new WeakMap(),
    ___instances = new WeakSet(),
    ___timer = async function* ___timer() {
        delete this.timer;
        while (__classPrivateFieldGet(this, ___isTiming, "f")) {
            const old = Date.now();
            await new Promise(resolve => {
                requestAnimationFrame(() => resolve());
            });
            const now = Date.now();
            yield now - old;
        }
    },
    _a));
