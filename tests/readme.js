import { EventDelegate } from '../code/index.js';
class Actor {
    constructor(onAct, onRest) {
        this.onAct = onAct;
        this.onRest = onRest;
        this.act = () => console.log(this.onAct);
        this.rest = () => console.log(this.onRest);
    }
}
// decouple event emmission from event subscription
const { weakSet: listeners, proxy: emitter } = new EventDelegate(new Actor());
// call act on all listeners  -> undefined
emitter.act();
// create subscriber
const actor = new Actor('Hello,', 'world!');
// add subscription
listeners.add(actor);
// call act on all listeners  -> 'Hello,'
emitter.act();
// call rest on all listeners -> 'world!'
emitter.rest();
// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
