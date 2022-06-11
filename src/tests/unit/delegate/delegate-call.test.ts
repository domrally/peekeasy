import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

function call() {
	new Delegate()()

	return true
}

test(call)
