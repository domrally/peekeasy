import { State } from '../../../src/state.js';
import { Triggers } from './triggers.js';
export declare abstract class Chronograph extends State<Chronograph, Triggers> {
    protected times: {
        total: number;
        lap: number;
    };
    abstract top(): void;
    abstract side(): void;
    constructor(times: {
        total: number;
        lap: number;
    });
    get total(): number;
    get lap(): number;
}
