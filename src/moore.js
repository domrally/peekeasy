//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
    }
    // 
    async *[Symbol.asyncIterator]() {
        while (true) {
            yield await Promise.race(this.states);
        }
    }
}
