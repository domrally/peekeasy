//
export class Mealy {
    //
    constructor(machine) {
        this.machine = machine;
        // 
        this.handler = {
            get: (_target, prop) => this.machine.current[prop],
            set: (_target, prop, value) => this.machine.current[prop] = value
        };
        this.current = new Proxy(machine.current, this.handler);
    }
}
