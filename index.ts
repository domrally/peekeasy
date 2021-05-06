import { State } from './src/interfaces/state.js'
import { Moore } from './src/moore.js'
import { Mealy } from './src/mealy.js'
import { Stack } from './src/stack.js'
import { Unstack } from './src/unstack.js'
import { Context } from './src/interfaces/context.js'
// 
const createMealyGetState = <S extends State<S>>(context: Context<S>) => {
    const mealy = new Mealy(context)
    return mealy.state
}
// this Mealy equivalent machine recognizes regular languages
export const CreateMealy = <S extends State<S>>(initial: S): S => {
    const moore = new Moore(initial)
    return createMealyGetState(moore)
}
// this pushdown equivalent automaton recognizes context-free languages
export const CreatePushdown = <S extends State<S>>(initial: S): S => {
    const stack = new Stack(initial)
    return createMealyGetState(stack)
}
// this turing equivalent machine recognizes context-free languages
// so really one turing equivalent machine simulating another 
export const CreateTuring = <S extends State<S>>(initial: S): S => {
    const stack = new Stack(initial)
    const unstack = new Unstack(stack)
    return createMealyGetState(unstack)
}
