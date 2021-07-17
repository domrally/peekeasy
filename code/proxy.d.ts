import { Custom } from './custom.js';
import { Eventable, Events } from './events.js';
export declare const proxy: <S, T extends Eventable>(initialState: S & Custom & AsyncIterable<Events<T>>, transitions: Record<Events<T>, [S & Custom & AsyncIterable<Events<T>>, S & Custom & AsyncIterable<Events<T>>][]>) => S & AsyncIterable<Events<T>>;
