import { compose, proxy, state } from '../code/main.js';
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
    const shared = state(), start = new Start(shared), end = new End(shared), currentState = proxy(start, {
        [Triggers.Hello]: [
            [start, end]
        ],
        [Triggers.World]: [
            [end, start]
        ]
    });
    // start the machine
    const loop = async () => {
        if (currentState.name !== 'Start') {
            throw new Error('currentState.name !== "Start"');
        }
        for await (const _ of currentState) {
            if (currentState.name === 'Start') {
                throw new Error('currentState.name !== "End"');
            }
            return;
        }
    };
    loop();
    currentState.changeState();
};
