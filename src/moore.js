// 
export class Moore {
    constructor(initial) {
        //
        this.updateLoop = async () => {
            while (true) {
                const next = await this.current.untilUpdate;
                this.current.onExit();
                this.current = next;
                this.current?.onEnter();
            }
        };
        this.current = initial;
        initial.onEnter();
        this.updateLoop();
    }
    // 
    get untilUpdate() {
        return this.current.untilUpdate;
    }
}
