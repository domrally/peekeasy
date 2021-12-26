import { SetHandler, WeakerSet } from '../code/index.js'

class Example {
    constructor(private message: string) { }
    test() {
        console.log(this.message)
    }
}
const example: Example = new Example('Hello, world!')

// common pattern
const subscriber: Set<Example> = new Set()
subscriber.add(example)
subscriber.forEach(sub => sub.test())

// our syntax
const subscribers: Set<Example>   = new SetHandler(),
      onPublish: WeakSet<Example> = new WeakerSet(subscribers),
      defaultCase: Example        = new Example('no spies'),
      publisher: Example          = new Proxy(defaultCase, subscribers)
onPublish.add(example)
publisher.test()

// finish
console.log('✅ readme')
