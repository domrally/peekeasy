export declare class Transitions<S, T extends number | string> extends Map<string, Map<S, S>> {
    constructor(triggers: {
        [index: number]: [S, S][];
    });
}
