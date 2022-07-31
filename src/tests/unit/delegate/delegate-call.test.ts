import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function call() {
	new Forward()()

	return true
}

test(call)
