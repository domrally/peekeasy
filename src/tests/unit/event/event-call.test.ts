import { Delegate, Event } from '../../../exports/exports'
import { test } from '../../test.test'

function call() {
	const delegate = new Delegate()

	new Event(delegate)

	delegate()

	return true
}

test(call)
