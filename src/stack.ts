import { State } from './interfaces/state.js'
import { Machine } from './interfaces/machine.js'
//
export class Stack<T extends State<T>> implements Machine<T> {
    // 
    private machine: Machine<T>
    // concrete implementation and state wrapper
    private readonly stack: T[]
    get current(): T {
        return this.stack[0]
    }
    //
    private readonly updateLoop = async () => {
        while (true) {
            const next = await this.machine.current.untilUpdate
            if (next) {
                this.stack.unshift(next)
            } else if (this.stack.length > 1) {
                this.stack.shift()
                this.machine.current = this.current
                this.current.onEnter()
            } else {
                throw new Error('untilNext() cant return null in your 1st state')
            }
        }
    }
    constructor(initial: Machine<T>) {
        this.machine = initial
        this.stack = [initial.current]
        this.updateLoop()
    }
}
