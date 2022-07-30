import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function call() {
	const delegate = new Forward()

	new Delegate(delegate)

	delegate()

	return true
}

test(call)
