import { composeState } from '../mealtime.js';
import { Buttons } from './buttons.js';
// 
export const Stopped = composeState(class _ {
    constructor(state) {
        this.state = state;
        this.top = () => this.state.trigger(Buttons.Top);
        this.side = () => this.state.trigger(Buttons.Side);
    }
});
