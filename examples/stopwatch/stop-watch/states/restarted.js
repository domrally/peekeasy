import { Triggers } from '../triggers';
import { Chronograph } from './chronograph';
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
