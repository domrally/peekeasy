import { Context } from './interfaces/context.js'
import { State } from './interfaces/state.js'
//
export class Unstack<S extends State<S>> implements Context<S> {
    // 
    private readonly _stack: S[] = []
    //
    private readonly _updateNext = async () => {
        await this.state.promiseNext
        this._stack.length = 0
    }
    private readonly _updateOutput = async () => {
        const output = await this.state.promiseOutput
        if (!output) {
            this._stack.unshift(this.state)
        } else if (this._stack.length > 0) {
            const old = this._stack.shift() as S
            await Promise.allSettled([old.promiseNext, old.transition(this.state)])
        }
    }
    private readonly _raceWhile = async () => {
        while (true) {
            await Promise.race([this._updateNext(), this._updateOutput()])
        }
    }
    constructor(private _machine: Context<S>) {
        this._raceWhile()
    }
    get state(): Readonly<S> {
        return this._machine.state
    }
}
