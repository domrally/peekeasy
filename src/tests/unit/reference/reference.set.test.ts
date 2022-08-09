import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

const o = [false]
function* generate() {
	while (true) {
		yield o
	}
}

async function referenceSet() {
	const reference = new Reference(generate())

	return (reference[0] = true)
}

test(referenceSet)
