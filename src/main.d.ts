import { State } from './state.js';
export { State };
export declare const CreateStateProxy: <S extends object & State<S, T>, T extends string | number>(initialState: S, transitions: {
    [index: number]: [S, S][];
}) => S & AsyncIterable<S>;
