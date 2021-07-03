import { Chronograph } from './chronograph.js';
import { Triggers } from './triggers.js';
// 
export class Stopped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => this.trigger(Triggers.Top);
        this.side = () => this.trigger(Triggers.Side);
    }
    onEnter() {
    }
    onExit() {
    }
}
