import { Mealy } from '../../src/mealy.js';
import { State } from '../../src/state.js';
class Chronograph extends State {
    constructor() {
        super(...arguments);
        // 
        this.time = 0;
        this.lap = 0;
    }
}
// 
class Restarted extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => {
            watching.time = 0;
            watching.watch();
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
            watching.watch();
            this.setState(watching);
        };
        this.split = () => this.setState(restarted);
    }
}
// 
class Watching extends Chronograph {
    constructor() {
        super(...arguments);
        this.isState = false;
        this.watch = async () => {
            this.isState = true;
            let time = Date.now();
            while (this.isState) {
                this.time += Date.now() - time;
                this.setState(this);
                const getRequest = (r) => window.requestAnimationFrame(() => r());
                await new Promise(resolve => getRequest(resolve));
            }
        };
        this.top = () => {
            this.isState = false;
            this.setState(stopped);
        };
        this.split = () => {
            lapped.time = this.time;
            lapped.lap = 0;
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
const { target, handler } = new Mealy(restarted);
export const stopwatch = new Proxy(target, handler);
const toString = (ms) => {
    let ss = ms / 1000;
    let mn = ss / 60;
    mn = Math.floor(mn);
    ss -= Math.floor(mn * 60);
    ms -= mn * 60 * 1000;
    ms -= ss * 1000;
    return `${mn}:${ss}:${ms}`;
};
export async function* time() {
    yield stopwatch.time;
    for await (const update of stopwatch) {
        yield toString(update.time);
    }
}
export async function* lap() {
    yield stopwatch.lap;
    for await (const update of stopwatch) {
        yield toString(update.lap);
    }
}
