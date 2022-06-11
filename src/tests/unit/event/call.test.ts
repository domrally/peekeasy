import { assert } from 'console'
import { Delegate, Event } from '../../../exports/exports'

async function test() {
	const delegate = new Delegate()

	new Event(delegate)

	delegate()

	return true
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
