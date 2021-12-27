import { EventDelegate } from '../code/index.js';
class Actor {
    constructor(onAct, rest) {
        this.onAct = onAct;
        this.rest = rest;
        this.act = () => console.log(this.onAct);
    }
}
// decouple event emmission from event subscription
const event = new EventDelegate(new Actor()), { weakSet: listeners, proxy: emitter } = event;
// add event listener
const actor = new Actor('Hello,', 'world!');
listeners.add(actor);
// emit act event to all listeners -> 'Hello,'
emitter.act();
// get rest property from delegate -> 'world!'
console.log(emitter.rest);
// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
