import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateToString() {
	new Delegate().toString()

	return true
}

test(delegateToString)
