import { Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateReference() {
	const //
		vector = new Vector(true),
		generate = function* () {
			while (true) {
				yield vector
			}
		},
		reference = new Reference(generate()),
		[is] = reference

	return is
}

test(integrationDelegateReference)
