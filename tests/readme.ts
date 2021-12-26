import { SetHandler, WeakerSet } from '../code/index.js'

class MyClass {
	constructor(private message: string) { }

	sendMessage() {
		console.log(this.message)
	}
}

class Event {
    spies:        Set<MyClass> & ProxyHandler<MyClass> = new SetHandler()
    spyOnSending: WeakSet<MyClass>                     = new WeakerSet(this.spies)
    spySender:    MyClass                              = new Proxy(new MyClass('no spies'), this.spies)
}

const { spyOnSending, spySender } = new Event(),
        test                      = new MyClass('Hello, world!')

spyOnSending.add(test)

spySender.sendMessage()

console.log('✅ readme')
