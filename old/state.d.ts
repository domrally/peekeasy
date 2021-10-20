import { Eventable, Events } from './events.js';
export interface state<T extends Eventable> extends AsyncIterable<Events<T>> {
    trigger: (event: Events<T>) => void;
}
export declare const state: <T extends Eventable>() => state<T>;
