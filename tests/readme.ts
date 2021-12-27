import { EventDelegate } from '../code/index.js'

class Actor {
    constructor(private onAct?: string, public text?: string) { }
    act = () => console.log(this.onAct)
}

// decouple event emmission from event subscription
const event = new EventDelegate(new Actor()),
    { weakSet: listeners, proxy: emitter } = event

// add event listener
const actor = new Actor('Hello,', 'world!')
listeners.add(actor)

// emit act event to all listeners -> 'Hello,'
emitter.act()

// get text property from delegate -> 'world!'
console.log(emitter.text)

// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
