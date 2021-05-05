import { CreateMealy } from './index.js'
import { State } from './src/interfaces/state.js'

interface Messager extends State<Messager> {
    message: string
}
class Initial implements Messager {
    message = 'Hello, World!'
    onEnter = () => {
        // console.log('enter')
    }
    onExit = () => {
        // console.log('exit')
    }
    untilUpdate = new Promise<Messager>(resolve => {
        const resolver = () => resolve(alt)
        window.requestAnimationFrame(resolver)
    })
}

class Alt implements Messager {
    message = 'hEllO, wOrLd!'
    onEnter = () => {
        // console.log('hi')
    }
    onExit = () => {
        // console.log('bye')
    }
    untilUpdate = new Promise<Messager>(resolve => {
        const resolver = () => resolve(initial)
        window.requestAnimationFrame(resolver)
    })
}
const alt = new Alt()
const initial = new Initial()
const test = async () => {
    const state = CreateMealy<Messager>(initial)
    let counter = 0
    while (true) {
        await state.untilUpdate
        counter++
        counter %= 200
        if (!counter) {
            console.log(state.message)
        }
    }
}
test()
        