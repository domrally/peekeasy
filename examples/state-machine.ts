import { CreateTuring } from '..'
import { State } from '../src/interfaces/state'
abstract class Stateable implements State<Stateable> {
    get promiseNext() {
        return new Promise<Readonly<Stateable>>(resolve => this._setNext = resolve)
    }
    get promiseOutput() {
        return new Promise<boolean>(resolve => this._setBackOrForward = resolve)
    }
    private _setBackOrForward: (isForward: boolean) => void
    protected readonly back = () => {this._setBackOrForward?.(false)}
    protected readonly forward = () => {this._setBackOrForward?.(true)}
    protected _setNext: (next: Stateable) => void
    async transition(next: Stateable): Promise<void> {
        this._setNext?.(next)
    }
    abstract onEnter(): void
    abstract onExit(): void
}
class Left  extends Stateable {
    private is1st = true
    onExit() {
        console.log('exit left')
    }
    onEnter() {
        window.requestAnimationFrame(() => {
            if (this.is1st) {
                this.is1st = false
                this._setNext(new Right())
            } else {
                this.forward()
            }
        })
    }
}
class Right extends Stateable {
    onExit() {
        console.log('exit right')
    }
    onEnter() {
        window.requestAnimationFrame(() => this.back())
    }
}
const update = async() => {
    const state = CreateTuring(new Left())
    while (true) {
        const exit = state.onExit
        const next = await state.promiseNext
        exit()
        next.onEnter()
    }
}
update()