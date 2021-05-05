import { CreateMealy } from './index.js'
import { State } from './src/interfaces/state.js'

interface Messager extends State<Messager> {
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
    untilUpdate = new Promise<Messager>(resolve => {
        const alt = new Alt()
        const resolver = () => resolve(alt)
        window.requestAnimationFrame(resolver)
    })
}
class Alt implements Messager {
    message = 'hEllO, wOrLd!'
    onEnter = () => {
        console.log('hi')
    }
    onExit = () => {
        console.log('bye')
    }
    untilUpdate = new Promise<Messager>(resolve => {
        const initial = new Initial()
        const resolver = () => resolve(initial)
        window.requestAnimationFrame(resolver)
    })
}
(async () => {
    const state = CreateMealy<Messager>(new Initial())
    while (true) {
        console.log(state.message)
        await state.untilUpdate
    }
})()
        