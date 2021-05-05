import { Machine } from './interfaces/machine.js'
import { State } from './interfaces/state.js'
// 
export class Moore<T extends State<T>> implements Machine<T> {
    // concrete implementation and state wrapper
    current: T
    //
    private readonly updateLoop = async () => {
        this.current.onEnter()
        while (true) {
            const next = await this.current.untilUpdate
            this.current.onExit()
            if (next) {
                this.current = next
                this.current.onEnter()
            }
        }
    }
    constructor(initial: T) {
        this.current = initial
        this.updateLoop()
    }

}
