import { EventForwarder } from '../code/index.js'

class Test {
    constructor(public text?: string, private onAct?: string) { }
    act = () => console.log(this.onAct)
}

// decouple event emmission from event subscription
const { caller, listeners } = new EventForwarder(new Test())

// add event listener
const test = new Test('Hello,', 'world!')
listeners.add(test)

// get text property from sender   -> 'Hello,'
console.log(caller.text)

// emit act event to all listeners -> 'world!'
caller.act()

// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
