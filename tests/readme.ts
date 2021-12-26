import { SetHandler, WeakerSet } from '../code/index.js'

class MyClass {
    constructor(
        private start: string,
        private end: string,
    ) { }

    sendMessage() {
        console.log(`${this.start} ${this.end}`)
    }
}

class Event {
    spies: Set<MyClass> & ProxyHandler<MyClass> = new SetHandler()

    defaultCase: MyClass                        = new MyClass('no', 'spies')
    spySender: MyClass                          = new Proxy(this.defaultCase, this.spies)
	 
    spyOnSender: WeakSet<MyClass>               = new WeakerSet(this.spies)
}

const { spyOnSender, spySender } = new Event(),
        test                     = new MyClass('Hello,', 'world!')

spyOnSender.add(test)

spySender.sendMessage()


console.log('✅ readme')
