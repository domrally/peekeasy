import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

function* generate() {
	while (true) {
		yield {}
	}
}

async function referenceToString() {
	new Reference(generate()).toString()

	return true
}

test(referenceToString)
