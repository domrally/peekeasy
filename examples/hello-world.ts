import { Moore } from "../src/moore"
import { State } from "../src/interfaces/state"

interface Letter extends State<Letter> {
    rune: string
}
abstract class Runer implements Letter {
    abstract readonly rune: string
    get promiseOutput() {
        return new Promise<Readonly<string>>(resolve => resolve(this.rune))
    }
    abstract readonly promiseNext: Promise<Letter>
    transition(_next: Letter): Promise<void> {
        throw new Error("Method not implemented.")
    }
}
class Hello extends Runer {
    get rune(): string {
        return 'Hello'
    }
    get promiseNext() {
        return new Promise<Letter>(resolve => {
            window.requestAnimationFrame(() => resolve(new Comma()))
        })
    }
}
class Comma extends Runer {
    get rune(): string {
        return ', '
    }
    get promiseNext() {
        return new Promise<Letter>(resolve => {
            window.requestAnimationFrame(() => resolve(new World()))
        })
    }
}
class World extends Runer {
    get rune(): string {
        return 'World!'
    }
    get promiseNext() {
        return new Promise<Letter>(_resolve => {})
    }
}

const moore = new Moore<Letter>(new Hello())
const spelling = async () => {
    while (true) {
        const output = await moore.state.promiseOutput
        console.log(output)
    }
}
spelling()
