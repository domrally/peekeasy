//
export class Unstack {
    constructor(_machine) {
        this._machine = _machine;
        // 
        this._stack = [];
        //
        this._updateNext = async () => {
            await this.state.promiseNext;
            this._stack.length = 0;
        };
        this._updateOutput = async () => {
            const output = await this.state.promiseOutput;
            if (!output) {
                this._stack.unshift(this.state);
            }
            else if (this._stack.length > 0) {
                const old = this._stack.shift();
                await Promise.allSettled([old.promiseNext, old.transition(this.state)]);
            }
        };
        this._raceWhile = async () => {
            while (true) {
                await Promise.race([this._updateNext(), this._updateOutput()]);
            }
        };
        this._raceWhile();
    }
    get state() {
        return this._machine.state;
    }
}
