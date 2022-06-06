import { assert } from 'console'
import { Event, WeakEvent } from '../../exports/exports'

class Consumer {
	constructor(onTest: WeakEvent<[string]>) {
		onTest.add(this.consume)
	}

	consume(message: string) {
		assert(message === 'Hello, world!')
	}
}

async function test() {
	const event = new Event<[string]>(['Hello, world!']),
		consumer = new Consumer(new WeakEvent(event))

	event('Hello, world!')

	return true
}

try {
	assert(test(), '❌ dependency-injection')
} catch (e) {
	assert(false, '❌ dependency-injection: ', e)
}
