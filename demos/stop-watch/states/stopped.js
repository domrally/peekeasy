import { Buttons } from './buttons.js';
const path = 'https://unpkg.com/mealtime';
const { compose } = await import(path);
// 
export const Stopped = compose(class _ {
    constructor(_timer, state) {
        this._timer = _timer;
        this.state = state;
        this.top = () => this.state.trigger(Buttons.Top);
        this.side = () => this.state.trigger(Buttons.Side);
    }
});
