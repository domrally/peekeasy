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
    get untilUpdate() {
        return new Promise<Messager>(resolve => {
            const resolver = () => resolve(alt)
            window.requestAnimationFrame(resolver)
        })
    }
}

class Alt implements Messager {
    message = 'hEllO, wOrLd!'
    onEnter = () => {
        // console.log('hi')
    }
    onExit = () => {
        // console.log('bye')
    }
    get untilUpdate() {
        return new Promise<Messager>(resolve => {
            const resolver = () => resolve(initial)
            window.requestAnimationFrame(resolver)
        })
    }
}
const alt = new Alt()
const initial = new Initial()
const test = async () => {
    const state = CreateMealy<Messager>(initial)
    let count = 0
    while (true) {
        const s = await state.untilUpdate
        if (!count) {
            console.log(s.message)
            console.log(state.message)
        }
        count++
        count %= 21
    }
}
test()
        