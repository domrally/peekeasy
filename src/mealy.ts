import { Machine } from './interfaces/machine.js'
import { State } from './interfaces/state.js'
//
export class Mealy<S extends State<S>> implements Machine<S> {
    readonly state: Readonly<S>
    private get _state() {
        return this._machine.state as any
    }
    // 
    private readonly handler = {
        get: (_: S, prop: any) => this._state[prop],
        set: (_: S, prop: any, value: any) => this._state[prop] = value
    }
    //
    constructor(private _machine: Machine<S>) {
        this.state = new Proxy<S>(_machine.state, this.handler)
    }
}
