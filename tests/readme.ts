import { EventDelegate } from '../code/index.js'

class Test {
    constructor(public text?: string, private onAct?: string) { }
    act = () => console.log(this.onAct)
}

// decouple event emmission from event subscription
const { event, delegate } = new EventDelegate(new Test())

// add event listener
const test = new Test('Hello,', 'world!')
event.add(test)

// get text property from delegate -> 'Hello,'
console.log(delegate.text)

// emit act event to all listeners -> 'world!'
delegate.act()

// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
