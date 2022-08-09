import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

function* generate() {
	while (true) {
		yield () => true
	}
}

async function referenceApply() {
	const reference = new Reference(generate())

	return reference()
}

test(referenceApply)
