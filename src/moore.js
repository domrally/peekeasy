// 
export class Moore {
    constructor(initial) {
        //
        this.updateLoop = async () => {
            this.current.onEnter();
            while (true) {
                let next = null;
                next = await this.current.untilUpdate;
                this.current.onExit();
                this.current = next;
                this.current?.onEnter();
            }
        };
        this.current = initial;
        this.updateLoop();
    }
}
