//
export class Stack {
    constructor(initial) {
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
            }
        };
        this.machine = initial;
        this.stack = [initial.current];
        this.updateLoop();
    }
    get current() {
        return this.stack[0];
    }
}
