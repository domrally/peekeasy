import { SetHandler, WeakerSet } from '../code/index.js'

class Subscriber {
    constructor(private message: string = 'empty') { }

    sendMessage = () => console.log(this.message)
}

// decouple subscription and publication
const subscription: Set<Subscriber>     = new SetHandler(),
      onPublish:    WeakSet<Subscriber> = new WeakerSet(subscription),
      publisher:    Subscriber          = new Proxy(new Subscriber(), subscription)

// create subscriber
const subscriber = new Subscriber('Hello, world!')

// add subscription
onPublish.add(subscriber)

// send message to subscribers
publisher.sendMessage()

// vanilla
// const subscribers = new Set<Example>()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())
