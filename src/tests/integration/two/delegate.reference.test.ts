import { Delegate, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateReference() {
	try {
		const //
			delegate = new Delegate(),
			generate = function* () {
				while (true) {
					yield function () {
						return delegate
					}
				}
			},
			_ = new Reference(generate())

		return false
	} finally {
		return true
	}
}

test(integrationDelegateReference)
