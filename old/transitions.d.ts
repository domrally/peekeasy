export declare const mapTransitions: <S extends object, T extends symbol>(record2transitions: Record<T, readonly [S, S][]>) => Record<T, WeakMap<S, S>>;
