import { Machineable } from "./state";
export declare const createTransitions: <S extends Machineable & AsyncIterable<T>, T extends symbol>(record2transitions: Record<T, readonly [S, S][]>) => Record<T, WeakMap<S, S>>;
