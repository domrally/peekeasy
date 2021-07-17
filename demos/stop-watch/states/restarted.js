import { Buttons } from './buttons.js';
//
const path = 'https://unpkg.com/mealtime';
const { compose } = await import(path);
export const Restarted = compose(class _ {
    constructor(times, state) {
        this.times = times;
        this.state = state;
        this.top = () => this.state.trigger(Buttons.Top);
    }
    onEnter() {
        this.times.lap = 0;
        this.times.total = 0;
    }
    side() { }
});
