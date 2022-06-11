import { assert } from 'console'
import { Delegate } from '../../../exports/exports'

async function test() {
	const delegate = new Delegate<[isTrue: boolean]>(),
		t = (message: boolean) => (is = message)

	let is = false

	delegate.add(t)
	delegate(true)

	delegate.delete(t)
	delegate(false)

	return is
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
