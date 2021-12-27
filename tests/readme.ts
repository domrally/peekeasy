import { EventDelegate } from '../code/index.js'

class Actor {
    constructor(private onAct?: string, private onRest?: string) { }
    act  = () => console.log(this.onAct)
    rest = () => console.log(this.onRest)
}

// decouple event emmission from event subscription
const event = new EventDelegate(new Actor()),
    { weakSet: listeners, proxy: emitter } = event

// call act on all listeners  -> undefined
emitter.act()

// add subscription
const actor = new Actor('Hello,', 'world!')
listeners.add(actor)

// call act on all listeners  -> 'Hello,'
emitter.act()

// call rest on all listeners -> 'world!'
emitter.rest()

// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
