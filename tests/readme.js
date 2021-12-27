import { EventDelegate } from '../code/index.js';
class Test {
    constructor(onAct, text) {
        this.onAct = onAct;
        this.text = text;
        this.act = () => console.log(this.onAct);
    }
}
// decouple event emmission from event subscription
const { event, delegate } = new EventDelegate(new Test());
// add event listener
const test = new Test('Hello,', 'world!');
event.add(test);
// emit act event to all listeners -> 'Hello,'
delegate.act();
// get text property from delegate -> 'world!'
console.log(delegate.text);
// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
