import { CreateMealy, CreatePushdown } from './index.js'
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
    message = 'oh, my!'
    onEnter = () => {
        // console.log('hi')
    }
    onExit = () => {
        // console.log('bye')
    }
    get untilUpdate() {
        return new Promise<Messager>(resolve => {
            const resolver = () => resolve(lol)
            window.requestAnimationFrame(resolver)
        })
    }
}

class Lol implements Messager {
    message = 'asdf, cloud!'
    onEnter = () => {
        // console.log('hi')
    }
    onExit = () => {
        // console.log('bye')
    }
    get untilUpdate() {
        return new Promise<Messager | any>(resolve => {
            const resolver = () => resolve(false)
            window.requestAnimationFrame(resolver)
        })
    }
}
const lol = new Lol()
const alt = new Alt()
const initial = new Initial()
const test = async () => {
    const state = CreatePushdown<Messager>(initial)
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
        