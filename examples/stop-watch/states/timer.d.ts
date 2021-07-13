import { State } from '../mealtime.js';
import { Buttons } from './buttons.js';
export declare class Timer extends State<Buttons> {
    #private;
    set total(value: number);
    get total(): number;
    set lap(value: number);
    get lap(): number;
    get totaller(): {
        [Symbol.asyncIterator](): AsyncIterator<string>;
    };
    get lapper(): {
        [Symbol.asyncIterator](): AsyncIterator<string>;
    };
}
