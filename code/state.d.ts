import { Eventable, Events } from './events.js';
export interface State<T extends Eventable> extends AsyncIterable<Events<T>> {
    trigger: (event: Events<T>) => void;
}
export declare const State: <T extends Eventable>() => State<T>;
