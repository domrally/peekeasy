import { SetAndProxyHandler, WeakSetWrapper } from '../code/index.js';
class Subscriber {
    constructor(onStart, onStop) {
        this.onStart = onStart;
        this.onStop = onStop;
        this.start = () => console.log(this.onStart);
        this.stop = () => console.log(this.onStop);
    }
}
// decouple subscription and publication
const subscription = new SetAndProxyHandler(), onPublish = new WeakSetWrapper(subscription), publisher = new Proxy(new Subscriber(), subscription);
// create subscriber
const subscriber = new Subscriber('Hello,', 'world!');
// add subscription
onPublish.add(subscriber);
// call start on all subscribers -> 'Hello,'
publisher.start();
// call stop on all subscribers  -> 'world!'
publisher.stop();
// remove subscription
onPublish.delete(subscriber);
// call start on all subscribers -> undefined
publisher.start();
// vanilla
// const subscribers = new Set<Example>()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
