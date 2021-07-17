import { compose, mealtime, State } from '../code/mealtime.js';
// 
export const assertMealtime = async () => {
    const Hello = Symbol('Hello'), World = Symbol('World'), Triggers = Object.freeze({
        Hello,
        World
    });
    const Start = compose(class _ {
        constructor(state) {
            this.state = state;
            this.name = 'Start';
            this.changeState = () => this.state.trigger(Triggers.Hello);
        }
    });
    const End = compose(class _ {
        constructor(state) {
            this.state = state;
            this.name = 'End';
            this.changeState = () => this.state.trigger(Triggers.World);
        }
    });
    // 
    const state = State(), start = new Start(state), end = new End(state);
    // 
    const currentState = mealtime(start, {
        [Triggers.Hello]: [
            [start, end]
        ],
        [Triggers.World]: [
            [end, start]
        ]
    });
    // start the machine
    const loop = async () => {
        for await (const _ of currentState) {
            return;
        }
    };
    loop();
    currentState.changeState();
};
