import { assert, log } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { call, callbacks } = new Caller<[string]>()
	for await (const [message] of callbacks) {
		log(message)
	}
	call('callbacks-async.test')
}

try {
	test()
} catch (e) {
	assert(false, '❌ callbacks-async.test ', e)
}
