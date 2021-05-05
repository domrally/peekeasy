import { CreateMealy } from './index.js'

interface Messager {
    message: string
}
class Initial implements Messager {
    message = 'Hello, World!'
    onEnter = () => {
        console.log('enter')
    }
    onExit = () => {
        console.log('exit')
    }
    untilUpdate = new Promise<Initial>(_resolve => {})
}
const state = CreateMealy(new Initial())
console.log(state.message)
        