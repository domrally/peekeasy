import { Chronograph } from './chronograph.js';
import { Triggers } from './triggers.js';
//
export class Restarted extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => this.raise(Triggers.Top);
    }
    onEnter() {
        this.times.lap = 0;
        this.times.total = 0;
    }
    onExit() {
    }
    side() { }
}
