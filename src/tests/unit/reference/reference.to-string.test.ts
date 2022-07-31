import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function referenceToString() {
	new Reference().toString()

	return true
}

test(referenceToString)
