import { IState, State } from './src/state.js';
import { Transitions } from './src/transitions.js';
export { IState, State };
export declare const CreateStateProxy: <S extends IState<S, T>, T extends number>(initialState: S, transitions: Transitions<S>) => S & AsyncIterable<S>;
