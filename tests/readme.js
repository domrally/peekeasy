import { SetHandler, WeakerSet } from '../code/index.js';
class MyClass {
    constructor(message) {
        this.message = message;
    }
    test() {
        console.log(this.message);
    }
}
const spies = new SetHandler(), defaultCase = new MyClass('no spies'), sender = new Proxy(defaultCase, spies), spyOnSender = new WeakerSet(spies), example = new MyClass('Hello, world!');
spyOnSender.add(example);
// functional syntax
spies.forEach(spy => spy.test());
// our syntax
sender.test();
console.log('✅ readme');
