import { assert } from 'console'
import { Caller } from '../../code/exports'
import type { CallableSet } from '../../code/exports'

class Consumer {
	constructor(private onTest: CallableSet<[string]>) {
		onTest.add(this.consume)
	}

	consume(message: string) {
		assert(message === 'Hello, world!')
	}
}

async function test() {
	const { call, callbacks } = new Caller<[string]>(),
		consumer = new Consumer(callbacks)

	call('Hello, world!')

	return true
}

try {
	assert(test(), '❌ dependency-injection')
} catch (e) {
	assert(false, '❌ dependency-injection: ', e)
}
