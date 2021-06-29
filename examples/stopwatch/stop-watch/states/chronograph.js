import { State } from '../../../../src/main.js';
export class Chronograph extends State {
    // 
    constructor(times) {
        super();
        this.times = times;
    }
    // 
    get total() {
        return this.times.total;
    }
    get lap() {
        return this.times.lap;
    }
}
