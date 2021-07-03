export declare type Transitions<S> = {
    [key: number]: [S, S][];
};
export declare class TransitionMap<S, T extends number> extends Map<T, Map<S, S>> {
    constructor(triggers: Transitions<S>);
}
