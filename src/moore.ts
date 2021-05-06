import { Context } from './interfaces/context.js'
import { State } from './interfaces/state.js'
// 
export class Moore<S extends State<S>> implements Context<S> {
    // 
    constructor(private _state: S) {
        (async () => {
            while (true) {
                this._state = await this._state.promiseNext
            }
        })()
    }
    // 
    get state(): Readonly<S> {
        return this._state
    }
}
