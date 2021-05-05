import { State } from './src/interfaces/state'
import { Moore } from './src/moore'
import { Mealy } from './src/mealy'
import { Stack } from './src/stack'
// this machine recognizes regular languages
export const CreateMealy = <T extends State<T>>(initial: T) => {
    const moore = new Moore(initial)
    const mealy = new Mealy(moore)
    return mealy.current
}
// this machine recognizes context-free languages
export const CreatePushdown = <T extends State<T>>(initial: T) => {
    const moore = new Moore(initial)
    const stack = new Stack(moore)
    const mealy = new Mealy(stack)
    return mealy.current
}
