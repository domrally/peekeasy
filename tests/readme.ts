import { SetHandler, WeakerSet } from '../code/index.js'

class Example {
    constructor(private message: string = 'empty') { }
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
      publisher: Example          = new Proxy(new Example(), subscribers)
onPublish.add(example)
publisher.test()

// finish
console.log('✅ readme')
