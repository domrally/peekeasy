import { State } from './interfaces/state.js'
import { Machine } from './interfaces/machine.js'
//
type think<T> = State<T> & Machine<T>
export class Stack<T extends State<T>> implements think<T> {
    get current(): T {
        return this.stack[0]
    }
    onEnter = () => {
        this.current.onEnter()
    }
    onExit = () => {
        this.current.onExit()
    }
    get untilUpdate(): Promise<T> {
        return this.promise
    }

    private promise: Promise<T> = new Promise(resolve => this.resolvePromise = resolve)
    private resolvePromise: (peek: T) => void = () => {throw new Error('not supposed to be able to get here')}
    // 
    private state: State<T>
    // concrete implementation and state wrapper
    private readonly stack: T[]
    //
    private readonly updateLoop = async () => {
        while (true) {
            const next = await this.state.untilUpdate
            if (next) {
                this.stack.unshift(next as T)
            } else if (this.stack.length > 1) {
                this.stack.shift()
            } else {
                throw new Error('untilNext() cant return null in your 1st state')
            }
            const resolve = this.resolvePromise
            this.promise = new Promise<T>(resolve => {
                this.resolvePromise = resolve
            })
            resolve(this.current)
        }
    }
    constructor(initial: T) {
        this.state = initial
        this.stack = [initial]
        this.updateLoop()
    }
}
