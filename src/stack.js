//
export class Stack {
    constructor(initial) {
        // 
        this.resolve = (_state) => { };
        this.update = () => {
            const r = this.resolve;
            this.promise = new Promise(resolve => {
                this.resolve = resolve;
            });
            r(this.current);
        };
        this.promise = new Promise(() => { });
        //
        this.updateLoop = async () => {
            while (true) {
                const next = await this.machine.current.untilUpdate;
                if (next) {
                    this.stack.unshift(next);
                }
                else if (this.stack.length > 1) {
                    this.stack.shift();
                    this.machine.current = this.current;
                    this.current.onEnter();
                }
                else {
                    throw new Error('untilNext() cant return null in your 1st state');
                }
                this.update();
            }
        };
        this.machine = initial;
        this.stack = [initial.current];
        this.updateLoop();
    }
    // 
    get untilUpdate() {
        return this.promise;
    }
    get current() {
        return this.stack[0];
    }
}
