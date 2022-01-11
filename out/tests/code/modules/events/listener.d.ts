import { Events } from './events.js';
import { Publisher } from './publisher.js';
export declare const events: Listener;
export declare class Listener implements Publisher<Events> {
    static init?(...args: (Partial<Publisher<Events>> | undefined)[]): Listener;
    readonly onTest: WeakSet<() => void>;
    private constructor();
}
