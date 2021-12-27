import { EventDelegate } from '../code/index.js';
class Actor {
    constructor(onAct, text) {
        this.onAct = onAct;
        this.text = text;
        this.act = () => console.log(this.onAct);
    }
}
// decouple event emmission from event subscription
const { event, delegate } = new EventDelegate(new Actor());
// add event listener
const actor = new Actor('Hello,', 'world!');
event.add(actor);
// emit act event to all listeners -> 'Hello,'
delegate.act();
// get text property from delegate -> 'world!'
console.log(delegate.text);
// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
