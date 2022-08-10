import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

const o = {}
function* generate() {
	while (true) {
		yield o
	}
}

async function referenceEquals() {
	const reference = new Reference(generate())

	return Object.getPrototypeOf(reference) === Object.getPrototypeOf(o)
}

test(referenceEquals)
