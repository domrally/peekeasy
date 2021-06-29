import { Triggers } from '../triggers';
import { Chronograph } from './chronograph';
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
