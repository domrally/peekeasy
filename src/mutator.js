export class Mutator {
    constructor(initial) {
        this.state = initial;
    }
    get onEnter() {
        return this.state.onEnter;
    }
    get onExit() {
        return this.state.onExit;
    }
    get current() {
        return this.state;
    }
    get untilUpdate() {
        return this.state.untilUpdate;
    }
}
