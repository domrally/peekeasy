import { createProxy, createState, State } from '../main.js';
// 
export const assertMain = async () => {
    // Triggers
    const Hello = Symbol('Hello');
    const World = Symbol('World');
    const Triggers = Object.freeze({
        Hello,
        World
    });
    const Start = createState(class _ {
        constructor(state) {
            this.state = state;
            this.name = 'Start';
            this.changeState = () => this.state.trigger(Triggers.Hello);
        }
    });
    const End = createState(class _ {
        constructor(state) {
            this.state = state;
            this.name = 'End';
            this.changeState = () => this.state.trigger(Triggers.World);
        }
    });
    // 
    const state = new State(), start = new Start(state), end = new End(state);
    // 
    const currentState = createProxy(start, {
        [Triggers.Hello]: [
            [start, end]
        ],
        [Triggers.World]: [
            [end, start]
        ]
    });
    // start the machine
    const logLoop = async () => {
        for await (const t of currentState) {
            return;
        }
    };
    const eventLoop = async () => {
        while (true) {
            await new Promise(resolve => setTimeout(() => {
                currentState.changeState();
                resolve();
            }, 1));
            return;
        }
    };
    await Promise.all([logLoop(), eventLoop()]);
};
