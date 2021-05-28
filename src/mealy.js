import { Moore } from './moore';
//
export class Mealy {
    // 
    constructor(currentState, ...states) {
        this.currentState = currentState;
        this.handler = {
            get: (_, property) => {
                const proxy = property === Symbol.asyncIterator
                    ? this.moore[Symbol.asyncIterator]
                    : this.currentState[property];
                return proxy;
            },
            set: (_, property, value) => this.currentState[property] = value
        };
        this.moore = new Moore(currentState, ...states);
        this.target = Object.assign(this.moore, currentState);
        const loop = async () => {
            // 
            for await (currentState of this.moore) { }
        };
        loop();
    }
}
