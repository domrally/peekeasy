// 
export class Moore {
    constructor(machine) {
        //
        this.updateLoop = async () => {
            this.machine.onEnter();
            let old = this.machine.current;
            while (true) {
                const next = await this.machine.untilUpdate;
                old?.onExit();
                next?.onEnter();
                old = next;
            }
        };
        this.machine = machine;
        this.updateLoop();
    }
    // concrete implementation and state wrapper
    get current() {
        return this.machine.current;
    }
}
