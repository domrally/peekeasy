export declare class Transitions<S, T extends number | string> extends Map<T, Map<S, S>> {
    constructor(triggers: {
        [index: number]: [S, S][];
    });
}
