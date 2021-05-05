import { Moore } from './src/moore.js';
import { Mealy } from './src/mealy.js';
import { Stack } from './src/stack.js';
import { Mutator } from './src/mutator.js';
// this machine recognizes regular languages
export const CreateMealy = (initial) => {
    const mutator = new Mutator(initial);
    const moore = new Moore(mutator);
    const mealy = new Mealy(moore);
    return mealy.current;
};
// this machine recognizes context-free languages
export const CreatePushdown = (initial) => {
    const stack = new Stack(initial);
    const moore = new Moore(stack);
    const mealy = new Mealy(moore);
    return mealy.current;
};
