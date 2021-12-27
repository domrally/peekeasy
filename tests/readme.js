import { SetHandler, WeakerSet } from '../code/index.js';
class Subscriber {
    constructor(onStart = 'start', onStop = 'stop') {
        this.onStart = onStart;
        this.onStop = onStop;
        this.start = () => console.log(this.onStart);
        this.stop = () => console.log(this.onStop);
    }
}
// decouple subscription and publication
const subscription = new SetHandler(), onPublish = new WeakerSet(subscription), publisher = new Proxy(new Subscriber(), subscription);
// create subscriber
const subscriber = new Subscriber('Hello,', 'world!');
// add subscription
onPublish.add(subscriber);
// send start to subscribers
publisher.start();
// send stop to subscribers
publisher.stop();
// vanilla
// const subscribers = new Set<Example>()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
