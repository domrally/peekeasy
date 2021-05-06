import { State } from "../src/interfaces/state"
import { Moore } from "../src/moore"

const moore = new Moore<Letter>(H)
const spelling = async () => {
    while (true) {
        const output = await moore.state.promiseOutput
        console.log(output)
    }
}
spelling()
interface Letter extends State<Letter> {
    rune: string
}
class Hello {

}
class Comma {

}
class World {
    
}
abstract class Runer implements Letter {
    protected abstract readonly rune: string
    get promiseOutput() {
        return new Promise<string>(resolve => resolve(this.rune))
    }
    promiseNext = new Promise<Letter>(()=>{})
    transition(_next: Letter): Promise<void> {
        throw new Error("Method not implemented.")
    }
}
