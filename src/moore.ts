import { Machine } from './interfaces/machine.js'
import { State } from './interfaces/state.js'
// 
export class Moore<T extends State<T>> implements Machine<T> {
    // concrete implementation and state wrapper
    get current(): T {
        return this.machine.current
    }
    private machine: Machine<T> & State<T>
    //
    private readonly updateLoop = async () => {
        this.machine.onEnter()
        let old = this.machine.current
        while (true) {
            const next = await this.machine.untilUpdate
            old?.onExit()
            next?.onEnter()
            old = next
        }
    }
    constructor(machine: Machine<T> & State<T>) {
        this.machine = machine
        this.updateLoop()
    }

}
