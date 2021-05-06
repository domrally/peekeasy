import { CreateMealy } from ".."
import { State } from "../src/interfaces/state"

abstract class Myzz implements State<Myzz> {
    promiseOutput = new Promise<any>(()=>{})
    abstract promiseNext: Promise<Readonly<Myzz>>
    transition(_next: Myzz): Promise<void> {
        throw new Error("Method not implemented.")
    }
    abstract consoleLog(count: number): void
}

class Fizz extends Myzz {
    private _resolve: (value: Readonly<Myzz> | PromiseLike<Readonly<Myzz>>) => void
    get promiseNext(): Promise<Readonly<Myzz>> {
        return new Promise(resolve => {this._resolve = resolve})
    }
    private isHot = true
    consoleLog(count: number): void {
        if (!(count%3)) return
        console.log('fizz')
        // buzz.consoleLog(count)recursion
        // TODO wait 2 then pass it back
        this.isHot = !this.isHot
        if (this.isHot)
        this._resolve(buzz)
    }
}
class Buzz extends Myzz {
    private _resolve: (value: Readonly<Myzz> | PromiseLike<Readonly<Myzz>>) => void
    get promiseNext(): Promise<Readonly<Myzz>> {
        return new Promise(resolve => {this._resolve = resolve})
    }
    consoleLog(count: number): void {
        if (!(count%5)) return
        console.log('buzz')
        fizz.consoleLog(count)
        this._resolve(fizz)
    }
}
const fizz = new Fizz()
const buzz = new Buzz()

const state = CreateMealy<Myzz>(new Fizz())
const myzzing = async () => {
    let count = 0
    while (true) {
        await new Promise(resolve => window.requestAnimationFrame(resolve))
        state.consoleLog(count++)
    }
}
myzzing()