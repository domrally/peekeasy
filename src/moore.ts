import { Machine } from './interfaces/machine.js'
import { State } from './interfaces/state.js'
// 
export class Moore<S extends State<S>> implements Machine<S> {
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
