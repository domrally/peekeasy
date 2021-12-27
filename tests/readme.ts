import { SetAndProxyHandler, WeakSetWrapper } from '../code/index.js'

class Subscriber {
    constructor(
        private onStart: string = 'start',
        private onStop:  string = 'stop',
    ) { }

    start = () => console.log(this.onStart)
    stop  = () => console.log(this.onStop)
}

// decouple subscription and publication
const subscription: Set<Subscriber>     = new SetAndProxyHandler(),
      onPublish:    WeakSet<Subscriber> = new WeakSetWrapper(subscription),
      publisher:    Subscriber          = new Proxy(new Subscriber(), subscription)

// create subscriber
const subscriber = new Subscriber('Hello,', 'world!')

// add subscription
onPublish.add(subscriber)

// call start on all subscribers -> 'Hello,'
publisher.start()

// call stop on all subscribers  -> 'world!'
publisher.stop()

// vanilla
// const subscribers = new Set<Example>()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
