import { compose } from './compose.js';
import { Custom } from './custom.js';
import { Events } from './events.js';
import { State } from './state.js';
export { State, mealtime, compose, Events };
declare const mealtime: <S, T extends symbol>(initialState: S & Custom & AsyncIterable<T>, transitions: Record<T, [S & Custom & AsyncIterable<T>, S & Custom & AsyncIterable<T>][]>) => S & AsyncIterable<T>;
