import { Mealy } from '../../src/mealy.js';
// 
class Pinky extends Promise {
    constructor(resolve = () => { }, reject = () => { }) {
        super((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}
class Chronograph extends Pinky {
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
            watching.watch();
            this.resolve(watching);
        };
        this.split = () => { };
    }
}
// 
class Lapped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => this.resolve(stopped);
        this.split = () => this.resolve(watching);
    }
}
// 
class Stopped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => {
            watching.watch();
            this.resolve(watching);
        };
        this.split = () => this.resolve(restarted);
    }
}
// 
class Watching extends Chronograph {
    constructor() {
        super(...arguments);
        this.updating = Promise.resolve();
        this.update = async () => {
            const u = this.updating;
            let time = Date.now();
            while (u === this.updating) {
                time = await this.loop(time);
            }
        };
        this.watch = () => {
            this.updating = this.update();
        };
        this.loop = async (time) => {
            this.milliseconds += Date.now() - time;
            this.resolve(this);
            const getRequest = (r) => window.requestAnimationFrame(() => r());
            await new Promise(resolve => getRequest(resolve));
            return Date.now();
        };
        this.top = () => {
            this.updating = Promise.resolve();
            this.resolve(stopped);
        };
        this.split = () => {
            lapped.milliseconds = this.milliseconds;
            return this.resolve(lapped);
        };
    }
}
// 
const restarted = new Restarted();
const lapped = new Lapped();
const stopped = new Stopped();
const watching = new Watching();
// 
const { target, handler } = new Mealy(restarted, lapped, stopped, watching);
export const stopwatch = new Proxy(target, handler);
