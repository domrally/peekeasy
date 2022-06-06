import { assert } from 'console'
import { Delegate } from '../../exports/exports'

async function test() {
	const delegate = new Delegate(),
		t = () => {}

	delegate.add(t)

	return delegate.has(t)
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
