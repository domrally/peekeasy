import { SetAndProxyHandler, WeakSetWrapper } from '../code/index.js'

class Subscriber {
    constructor(
        private onNext?:   string,
        private onUpdate?: string,
    ) { }

    next   = () => console.log(this.onNext)
    update = () => console.log(this.onUpdate)
}

// decouple subscription and publication
const subscribers:  Set<Subscriber>     = new SetAndProxyHandler(),
      subscription: WeakSet<Subscriber> = new WeakSetWrapper(subscribers),
      publisher:    Subscriber          = new Proxy(new Subscriber(), subscribers)

// create subscriber
const subscriber = new Subscriber('Hello,', 'world!')

// add subscription
subscription.add(subscriber)

// call next on all subscribers   -> 'Hello,'
publisher.next()

// call update on all subscribers -> 'world!'
publisher.update()

// remove subscription
subscription.delete(subscriber)

// call next on all subscribers   -> undefined
publisher.next()

// vanilla
// const subscribers = new Set<Example>()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
