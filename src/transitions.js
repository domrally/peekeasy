export const createTransitions = (record2transitions) => {
    //
    const keys = Object.getOwnPropertySymbols(record2transitions);
    const record2map = {};
    const triggerer = (trigger) => {
        const map = new WeakMap();
        record2map[trigger] = map;
        const mapper = (transition) => map.set(...transition);
        record2transitions[trigger].forEach(mapper);
    };
    keys.forEach(triggerer);
    return record2map;
};
