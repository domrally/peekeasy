//
export class Mealy {
    //
    constructor(_machine) {
        this._machine = _machine;
        // 
        this.handler = {
            get: (_, prop) => this._state[prop],
            set: (_, prop, value) => this._state[prop] = value
        };
        this.state = new Proxy(_machine.state, this.handler);
    }
    get _state() {
        return this._machine.state;
    }
}
