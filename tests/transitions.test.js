import { composeState, createTransitions, State } from '../code/main.js';
// 
export const assertTransitions = () => {
    const A = Symbol('A');
    const B = Symbol('B');
    const Letters = Object.freeze({
        A,
        B,
    });
    const One = composeState(class _ {
        constructor(state) {
            this.state = state;
        }
    });
    const Two = composeState(class _ {
        constructor(state) {
            this.state = state;
        }
    });
    const state = new State(), one = new One(state), two = new Two(state);
    const transitionMap = createTransitions({
        [Letters.A]: [
            [one, two],
        ],
        [Letters.B]: [
            [two, one],
        ],
    });
    try {
        if (transitionMap[Letters.A].get(one) !== two) {
            throw new Error('should not be here');
        }
    }
    catch (e) {
        throw new Error('TransitionMap throws error when getting non-existent transition');
    }
    try {
        if (transitionMap[Letters.B].get(two) !== one) {
            throw new Error('should not be here');
        }
    }
    catch (e) {
        throw new Error('TransitionMap throws error when getting non-existent transition');
    }
    let twoOne = null;
    try {
        twoOne = transitionMap[Letters.B].get(one);
    }
    finally {
        if (twoOne) {
            throw new Error('TransitionMap throws error when getting non-existent transition');
        }
    }
    let AB = null;
    try {
        AB = transitionMap[Letters.A].get(two);
    }
    finally {
        if (AB) {
            throw new Error('TransitionMap throws error when getting non-existent transition');
        }
    }
};
