import { Forward, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardReference() {
	const //
		f = () => {},
		forward = new Forward(f),
		generate = function* () {
			while (true) {
				yield forward
			}
		},
		reference = new Reference(generate())

	return reference.has(f)
}

test(integrationForwardReference)
