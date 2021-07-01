import { Chronograph } from './chronograph.js';
import { Triggers } from './triggers.js';
// 
export class Stopped extends Chronograph {
    constructor() {
        super(...arguments);
        this.top = () => this.raise(Triggers.Top);
        this.side = () => this.raise(Triggers.Side);
    }
    onEnter() {
    }
    onExit() {
    }
}