import { Mealy } from '../../src/mealy.js';
// 
class Pinky extends Promise {
    constructor(res = () => { }, rej = () => { }) {
        super((resolve, reject) => {
            res = resolve;
            rej = reject;
        });
        this.resolve = res;
        this.reject = rej;
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
            const watching = new Watching();
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
        this.top = () => this.resolve(new Stopped());
        this.split = () => this.resolve(new Watching());
    }
}
// 
class Stopped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => {
            const watching = new Watching();
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
            const newWatching = new Watching(this.resolve, this.reject);
            this.resolve(newWatching);
            const getRequest = (r) => window.requestAnimationFrame(() => r());
            await new Promise(resolve => getRequest(resolve));
            return Date.now();
        };
        this.top = () => {
            this.updating = Promise.resolve();
            this.resolve(new Stopped());
        };
        this.split = () => {
            const lapped = new Lapped();
            lapped.milliseconds = this.milliseconds;
            return this.resolve(lapped);
        };
    }
}
// 
const restarted = new Restarted();
// 
const { target, handler } = new Mealy(restarted);
export const stopwatch = new Proxy(target, handler);
