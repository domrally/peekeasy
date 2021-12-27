import { SetHandler, WeakerSet } from '../code/index.js';
class Example {
    constructor(message = 'empty') {
        this.message = message;
    }
    test() {
        console.log(this.message);
    }
}
const example = new Example('Hello, world!');
// vanilla
// const subscribers: Set<Example> = new Set()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
// ours
const subscription = new SetHandler(), onPublish = new WeakerSet(subscription), publisher = new Proxy(new Example(), subscription);
onPublish.add(example);
publisher.test();
// finish
console.log('✅ readme');
