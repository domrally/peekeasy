import { assert } from 'console'
import { Caller } from '../../code/exports'
import { CallSet } from '../../code/exports/call-set'

class Consumer {
	constructor(private onTest: CallSet<[string]>) {
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
