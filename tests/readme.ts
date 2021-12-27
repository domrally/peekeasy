import { SetAndProxyHandler, WeakSetWrapper } from '../code/index.js'

class Actor {
    constructor(
        private onAct?:  string,
        private onRest?: string,
    ) { }

    act  = () => console.log(this.onAct)
    rest = () => console.log(this.onRest)
}

// decouple event emmission from event subscription
const listeners: Set<Actor>     = new SetAndProxyHandler(),
      event:     WeakSet<Actor> = new WeakSetWrapper(listeners),
      emitter:   Actor          = new Proxy(new Actor(), listeners)

// create subscriber
const actor = new Actor('Hello,', 'world!')
 
// add subscription
event.add(actor)

// call act on all listeners  -> 'Hello,'
emitter.act()

// call rest on all listeners -> 'world!'
emitter.rest()

// delete subscription
event.delete(actor)

// call act on all listeners  -> undefined
emitter.act()

// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
