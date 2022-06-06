import { assert } from 'console'
import { Delegate } from '../../../exports/exports'

async function test() {
	new Delegate()()
	return true
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
