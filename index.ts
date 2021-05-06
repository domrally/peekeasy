import { State } from './src/interfaces/state.js'
import { Moore } from './src/moore.js'
import { Mealy } from './src/mealy.js'
import { Stack } from './src/stack.js'
import { Unstack } from './src/unstack.js'
import { Machine } from './src/interfaces/machine.js'
// 
const getMealyState = <S extends State<S>>(machine: Machine<S>) => {
    const mealy = new Mealy(machine)
    return mealy.state
}
// this machine recognizes regular languages
export const CreateMealy = <S extends State<S>>(initial: S): S => {
    const moore = new Moore(initial)
    return getMealyState(moore)
}
// this machine recognizes context-free languages
export const CreatePushdown = <S extends State<S>>(initial: S): S => {
    const stack = new Stack(initial)
    return getMealyState(stack)
}
// this machine recognizes context-free languages
export const CreateTuring = <S extends State<S>>(initial: S): S => {
    const stack = new Stack(initial)
    const unstack = new Unstack(stack)
    return getMealyState(unstack)
}
