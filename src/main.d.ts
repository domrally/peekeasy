import { State } from './state.js';
import { Transitions } from './transitions.js';
export { State };
export declare const CreateStateProxy: <S extends object & State<S, T>, T extends number>(initialState: S, transitions: Transitions<S>) => S & AsyncIterable<S>;
