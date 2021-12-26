import { SetHandler, WeakerSet } from '../code/index.js'

class MyClass {
    constructor(private message: string) { }

    test() {
        console.log(this.message)
    }
}
// common prep
const spies: Set<MyClass> & ProxyHandler<MyClass> = new SetHandler(),
      spyOnSender: WeakSet<MyClass>               = new WeakerSet(spies),
      example: MyClass                            = new MyClass('Hello, world!')

// our prep
const defaultCase: MyClass = new MyClass('no spies'),
      sender: MyClass      = new Proxy(defaultCase, spies)

// subscription
spyOnSender.add(example)

// functional publish syntax
spies.forEach(spy => spy.test())

// our publish syntax
sender.test()

console.log('✅ readme')
