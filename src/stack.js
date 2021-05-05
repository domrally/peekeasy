export class Stack {
    constructor(initial) {
        this.onEnter = () => {
            this.current.onEnter();
        };
        this.onExit = () => {
            this.current.onExit();
        };
        this.promise = new Promise(resolve => this.resolvePromise = resolve);
        this.resolvePromise = () => { throw new Error('not supposed to be able to get here'); };
        //
        this.updateLoop = async () => {
            while (true) {
                const next = await this.state.untilUpdate;
                if (next) {
                    this.stack.unshift(next);
                }
                else if (this.stack.length > 1) {
                    this.stack.shift();
                }
                else {
                    throw new Error('untilNext() cant return null in your 1st state');
                }
                const resolve = this.resolvePromise;
                this.promise = new Promise(resolve => {
                    this.resolvePromise = resolve;
                });
                resolve(this.current);
            }
        };
        this.state = initial;
        this.stack = [initial];
        this.updateLoop();
    }
    get current() {
        return this.stack[0];
    }
    get untilUpdate() {
        return this.promise;
    }
}
