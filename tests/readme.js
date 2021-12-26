import { SetHandler, WeakerSet } from '../code/index.js';
class MyClass {
    constructor(message) {
        this.message = message;
    }
    sendMessage() {
        console.log(this.message);
    }
}
class Event {
    constructor() {
        this.spies = new SetHandler();
        this.spyOnSending = new WeakerSet(this.spies);
        this.spySender = new Proxy(new MyClass('no spies'), this.spies);
    }
}
const { spyOnSending, spySender } = new Event(), test = new MyClass('Hello, world!');
spyOnSending.add(test);
spySender.sendMessage();
console.log('✅ readme');
