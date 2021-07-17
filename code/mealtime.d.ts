import { compose } from './compose.js';
import { Custom } from './custom.js';
import { events } from './events.js';
import { State } from './state.js';
export { State, mealtime, compose, events };
declare const mealtime: <S, T extends symbol>(initialState: S & Custom & AsyncIterable<T>, transitions: Record<T, [S & Custom & AsyncIterable<T>, S & Custom & AsyncIterable<T>][]>) => S & AsyncIterable<T>;
