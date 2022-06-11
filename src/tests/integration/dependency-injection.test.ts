import { Delegate, Event } from '../../exports/exports'
import { assert } from 'console'

class Consumer {
	constructor(onTest: Event<[string]>) {
		onTest.add(this.consume)
	}

	consume(message: string) {
		assert(message === 'Hello, world!')
	}
}

async function test() {
	const delegate = new Delegate<[string]>(),
		event = new Event(delegate)

	new Consumer(event)

	delegate('Hello, world!')

	return true
}

try {
	assert(test(), '❌ dependency-injection')
} catch (e) {
	assert(false, '❌ dependency-injection: ', e)
}
