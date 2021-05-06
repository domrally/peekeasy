// 
export class Moore {
    // 
    constructor(_state) {
        this._state = _state;
        (async () => {
            while (true) {
                this._state = await this._state.promiseNext;
            }
        })();
    }
    // 
    get state() {
        return this._state;
    }
}
