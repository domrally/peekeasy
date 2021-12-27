import { Operator } from '../code/index.js';
class Test {
    constructor(text, onAct) {
        this.text = text;
        this.onAct = onAct;
        this.act = () => console.log(this.onAct);
    }
}
// decouple event emmission from event subscription
const { caller, listeners } = new Operator(new Test());
// add event listener
const test = new Test('Hello,', 'world!');
listeners.add(test);
// get text property from listener -> 'Hello,'
console.log(caller.text);
// call act event on all listeners -> 'world!'
caller.act();
// vanilla
// const listeners = new Set<Example>()
// listeners.add(example)
// listeners.forEach(sub => sub.test())
