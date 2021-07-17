import { compose, state } from '../code/main.js';
import { mapTransitions } from '../code/transitions.js';
// 
export const assertTransitions = async () => {
    const A = Symbol('A');
    const B = Symbol('B');
    const Letters = Object.freeze({
        A,
        B,
    });
    const One = compose(class _ {
        constructor(state) {
            this.state = state;
        }
    });
    const Two = compose(class _ {
        constructor(state) {
            this.state = state;
        }
    });
    const shared = state(), one = new One(shared), two = new Two(shared);
    const transitionMap = mapTransitions({
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
