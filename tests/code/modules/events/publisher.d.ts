import { Events } from './events.js';
export declare type Publisher<T extends Events> = Pick<Record<Events, WeakSet<() => void>>, T>;
