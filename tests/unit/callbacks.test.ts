import { assert, log } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { call, callbacks } = new Caller<[string]>()

	callbacks.add((message: string) => log(message))

	call('callbacks.test')
}

try {
	test()
} catch (e) {
	assert(false, '❌ callbacks.test ', e)
}
