import { Machine } from './interfaces/machine'
import { State } from './interfaces/state'
export class Moore<T extends State<T>> implements Machine<T> {
    // 
    get untilUpdate(): Promise<T> {
        return this.current.untilUpdate
    }
    // concrete implementation and state wrapper
    current: T
    //
    private readonly updateLoop = async () => {
        while (true) {
            const next = await this.current.untilUpdate
            this.current.onExit()
            this.current = next
            this.current?.onEnter()
        }
    }
    constructor(initial: T) {
        this.current = initial
        this.updateLoop()
    }
}
