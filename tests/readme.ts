import { SetHandler, WeakerSet } from '../code/index.js'

class MyClass {
    constructor(private message: string) { }

    test() {
        console.log(this.message)
    }
}

const spies: Set<MyClass> & ProxyHandler<MyClass> = new SetHandler(),
      defaultCase: MyClass                        = new MyClass('no spies'),
      sender: MyClass                             = new Proxy(defaultCase, spies),
      spyOnSender: WeakSet<MyClass>               = new WeakerSet(spies),
      example: MyClass                            = new MyClass('Hello, world!')

spyOnSender.add(example)

// functional syntax
spies.forEach(spy => spy.test())

// our syntax
sender.test()

console.log('✅ readme')
