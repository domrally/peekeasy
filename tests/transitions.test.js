import { State } from '../src/state.js';
import { TransitionMap } from '../src/transitions.js';
var Triggers;
(function (Triggers) {
    Triggers[Triggers["A"] = 0] = "A";
    Triggers[Triggers["B"] = 1] = "B";
})(Triggers || (Triggers = {}));
class MyState extends State {
    onEnter() { }
    onExit() { }
}
class A extends MyState {
}
class B extends MyState {
}
const a = new A(), b = new B(), transitions = {
    [Triggers.A]: [
        [a, b],
    ],
    [Triggers.B]: [
        [b, a],
    ],
};
const transitionMap = new TransitionMap(transitions);
export const assertTransitions = () => {
    try {
        if (transitionMap.get(Triggers.A)?.get(a) !== b) {
            throw new Error('should not be here');
        }
    }
    catch (e) {
        throw new Error('TransitionMap throws error when getting non-existent transition');
    }
    try {
        if (transitionMap.get(Triggers.B)?.get(b) !== a) {
            throw new Error('should not be here');
        }
    }
    catch (e) {
        throw new Error('TransitionMap throws error when getting non-existent transition');
    }
    let BA = null;
    try {
        BA = transitionMap.get(Triggers.B)?.get(a);
    }
    finally {
        if (BA) {
            throw new Error('TransitionMap throws error when getting non-existent transition');
        }
    }
    let AB = null;
    try {
        AB = transitionMap.get(Triggers.A)?.get(b);
    }
    finally {
        if (AB) {
            throw new Error('TransitionMap throws error when getting non-existent transition');
        }
    }
};
