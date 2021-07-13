import { composeState } from '../mealtime.js';
import { Buttons } from './buttons.js';
//
export const Restarted = composeState(class _ {
    constructor(state) {
        this.state = state;
        this.top = () => this.state.trigger(Buttons.Top);
    }
    onEnter() {
        this.state.lap = 0;
        this.state.total = 0;
    }
    side() { }
});
