import { SetHandler, WeakerSet } from '../code/index.js';
class MyClass {
    constructor(message) {
        this.message = message;
    }
    test() {
        console.log(this.message);
    }
}
// publish subscribe syntax
const subscribers = new Set();
const sub = new MyClass('Hello, world!');
subscribers.add(sub);
subscribers.forEach(sub => sub.test());
// our syntax
const spies = new SetHandler(), spyOnSender = new WeakerSet(spies), defaultCase = new MyClass('no spies'), sender = new Proxy(defaultCase, spies);
const spy = new MyClass('Hello, world!');
spyOnSender.add(spy);
sender.test();
console.log('✅ readme');
