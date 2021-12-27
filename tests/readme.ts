import { SetHandler, WeakerSet } from '../code/index.js'

class Example {
    constructor(private message: string = 'empty') { }
    test() {
        console.log(this.message)
    }
}
const example: Example = new Example('Hello, world!')

// vanilla
// const subscribers: Set<Example> = new Set()
// subscribers.add(example)
// subscribers.forEach(sub => sub.test())

// ours
const subscription: Set<Example>     = new SetHandler(),
      onPublish:    WeakSet<Example> = new WeakerSet(subscription),
      publisher:    Example          = new Proxy(new Example(), subscription)
onPublish.add(example)
publisher.test()

// finish
console.log('✅ readme')
