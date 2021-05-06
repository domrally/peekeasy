import { Moore } from './src/moore.js';
import { Mealy } from './src/mealy.js';
import { Stack } from './src/stack.js';
import { Unstack } from './src/unstack.js';
// 
const createMealyGetState = (context) => {
    const mealy = new Mealy(context);
    return mealy.state;
};
// this Mealy equivalent machine recognizes regular languages
export const CreateMealy = (initial) => {
    const moore = new Moore(initial);
    return createMealyGetState(moore);
};
// this pushdown equivalent automaton recognizes context-free languages
export const CreatePushdown = (initial) => {
    const stack = new Stack(initial);
    return createMealyGetState(stack);
};
// this turing equivalent machine recognizes context-free languages
// so really one turing equivalent machine simulating another 
export const CreateTuring = (initial) => {
    const stack = new Stack(initial);
    const unstack = new Unstack(stack);
    return createMealyGetState(unstack);
};
