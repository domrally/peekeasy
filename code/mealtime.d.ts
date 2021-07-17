import { compose } from './compose.js';
import { Custom } from './custom.js';
import { Eventable, Events } from './events.js';
import { State } from './state.js';
export { compose, State, mealtime };
declare const mealtime: <S, T extends Eventable>(initialState: S & Custom & AsyncIterable<Events<T>>, transitions: Record<Events<T>, [S & Custom & AsyncIterable<Events<T>>, S & Custom & AsyncIterable<Events<T>>][]>) => S & AsyncIterable<Events<T>>;
