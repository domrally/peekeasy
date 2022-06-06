import { assert } from 'console'
import { Delegate, Event } from '../../exports/exports'

class Consumer {
	constructor(onTest: Event<[string]>) {
		onTest.add(this.consume)
	}

	consume(message: string) {
		assert(message === 'Hello, world!')
	}
}

async function test() {
	const delegate = new Delegate<[string]>(['Hello, world!']),
		consumer = new Consumer(new Event(delegate))

	delegate('Hello, world!')

	return true
}

try {
	assert(test(), '❌ dependency-injection')
} catch (e) {
	assert(false, '❌ dependency-injection: ', e)
}
