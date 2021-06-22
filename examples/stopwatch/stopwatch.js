var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _setState;
import { Mealy } from '../../src/mealy.js';
// 
class Pinky extends Promise {
    constructor(executor) {
        super(executor);
        this.resolve = executor.arguments[0];
        this.reject = executor.arguments[1];
    }
}
class Context {
    constructor() {
        //      
        _setState.set(this, () => { });
    }
    get setState() {
        return __classPrivateFieldGet(this, _setState);
    }
    // 
    async *[(_setState = new WeakMap(), Symbol.asyncIterator)]() {
        while (true) {
            yield await new Promise(resolve => __classPrivateFieldSet(this, _setState, resolve));
        }
    }
}
class Chronograph extends Context {
    constructor() {
        super(...arguments);
        // 
        this.milliseconds = 0;
        this.toString = () => {
            let ms = this.milliseconds;
            let ss = ms / 1000;
            let mn = ss / 60;
            mn = Math.floor(mn);
            ss -= Math.floor(mn * 60);
            ms -= mn * 60 * 1000;
            ms -= ss * 1000;
            return `${mn}:${ss}:${ms}`;
        };
    }
}
// 
class Restarted extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => {
            watching.milliseconds = 0;
            // watching.watch()
            this.setState(watching);
        };
        this.split = () => { };
    }
}
// 
class Lapped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => this.setState(stopped);
        this.split = () => this.setState(watching);
    }
}
// 
class Stopped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => {
            // watching.watch()
            this.setState(watching);
        };
        this.split = () => this.setState(restarted);
    }
}
// 
class Watching extends Chronograph {
    constructor() {
        super(...arguments);
        // private updating: Promise<void> = Promise.resolve()
        // update = async () => {
        // 	const u = this.updating
        // 	let time = Date.now()
        // 	while (u === this.updating) {
        // 		time = await this.loop(time)
        // 	}
        // }
        // watch = () => {
        // 	this.updating = this.update()
        // }
        // private loop = async (time: number) => {
        // 	this.milliseconds += Date.now() - time
        // 	this.setState(this)
        // 	const getRequest = (r: any) => window.requestAnimationFrame(() => r())
        // 	await new Promise(resolve => getRequest(resolve))
        // 	return Date.now()
        // }
        this.top = () => {
            // this.updating = Promise.resolve()
            this.setState(stopped);
        };
        this.split = () => {
            lapped.milliseconds = this.milliseconds;
            return this.setState(lapped);
        };
    }
}
// 
const restarted = new Restarted();
const watching = new Watching();
const stopped = new Stopped();
const lapped = new Lapped();
// 
const { target, handler } = new Mealy(restarted, watching, stopped, lapped);
export const stopwatch = new Proxy(target, handler);
