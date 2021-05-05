import { State } from './interfaces/state.js'
import { Machine } from './interfaces/machine.js'
//
type think<T> = State<T> & Machine<T>
export class Mutator<T extends State<T>> implements think<T> {
    private state: T
    constructor(initial: T) {
        this.state = initial
    }
    get onEnter() {
        return this.state.onEnter
    }
    get onExit() {
        return this.state.onExit
    }
    get current(): T {
        return this.state
    }
    get untilUpdate(): Promise<T> {
        return this.state.untilUpdate
    }
}
