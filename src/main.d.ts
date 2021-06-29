import { State } from './state.js';
export { State };
export declare const CreateStateProxy: <S extends object & State<S, T>, T>(initialState: S, transitions: Map<[S, T], S>) => S & AsyncIterable<S>;
