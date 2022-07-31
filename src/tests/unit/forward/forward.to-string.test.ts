import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardToString() {
	new Forward().toString()

	return true
}

test(forwardToString)
