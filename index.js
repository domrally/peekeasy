import { Moore } from './src/moore.js';
import { Mealy } from './src/mealy.js';
import { Stack } from './src/stack.js';
import { Unstack } from './src/unstack.js';
// 
const getMealyState = (machine) => {
    const mealy = new Mealy(machine);
    return mealy.state;
};
// this machine recognizes regular languages
export const CreateMealy = (initial) => {
    const moore = new Moore(initial);
    return getMealyState(moore);
};
// this machine recognizes context-free languages
export const CreatePushdown = (initial) => {
    const stack = new Stack(initial);
    return getMealyState(stack);
};
// this machine recognizes context-free languages
export const CreateTuring = (initial) => {
    const stack = new Stack(initial);
    const unstack = new Unstack(stack);
    return getMealyState(unstack);
};
