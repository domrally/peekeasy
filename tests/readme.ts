import { SetHandler, WeakerSet } from '../code/index.js'

class MyClass {
    constructor(private message: string) { }

    test() {
        console.log(this.message)
    }
}


// publish subscribe syntax

const subscribers: Set<MyClass> = new Set()

const sub: MyClass = new MyClass('Hello, world!')
subscribers.add(sub)

subscribers.forEach(sub => sub.test())


// our syntax

const spies: Set<MyClass> & ProxyHandler<MyClass> = new SetHandler(),
      spyOnSender: WeakSet<MyClass>               = new WeakerSet(spies),
      defaultCase: MyClass                        = new MyClass('no spies'),
      sender: MyClass                             = new Proxy(defaultCase, spies)

const spy: MyClass = new MyClass('Hello, world!')
spyOnSender.add(spy)

sender.test()

console.log('✅ readme')
