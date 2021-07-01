import { State } from '../../../src/state.js';
import { Timer } from './timer.js';
import { Triggers } from './triggers.js';
export declare abstract class Chronograph extends State<Chronograph, Triggers> {
    protected times: Timer;
    abstract top(): void;
    abstract side(): void;
    constructor(times: Timer);
    totaller(): AsyncGenerator<string, void, undefined>;
    lapper(): AsyncGenerator<string, void, undefined>;
}
