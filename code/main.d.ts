import { composeState, createState, Machineable, State } from './state.js';
import { createTransitions } from './transitions.js';
import { createTriggers } from './triggers.js';
declare const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<T>;
export { Machineable, createState, createProxy, composeState, createTriggers, createTransitions, State };
