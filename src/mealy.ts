import { Machine } from "./interfaces/machine.js"
import { State } from "./interfaces/state.js"
//
export class Mealy<T extends State<T>> implements Machine<T> {
    // 
    private readonly handler = {
        get: (_target: T, prop: any) => (this.machine as any).current[prop],
        set: (_target: T, prop: any, value: any) => (this.machine as any).current[prop] = value
    }
    // tools for managing the state from outside the machine
    readonly current: T
    //
    constructor(private machine: Machine<T>) {
        this.current = new Proxy<T>(machine.current, this.handler)
    }
}
