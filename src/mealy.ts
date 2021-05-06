import { Context } from './interfaces/context.js'
import { State } from './interfaces/state.js'
//
export class Mealy<S extends State<S>> implements Context<S> {
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
    constructor(private _machine: Context<S>) {
        this.state = new Proxy<S>(_machine.state, this.handler)
    }
}
