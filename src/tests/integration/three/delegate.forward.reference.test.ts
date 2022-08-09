import { Delegate, Forward, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateForwardReference() {
	const //
		f = () => {},
		forward = new Forward(f),
		delegate = new Delegate(forward),
		generate = function* () {
			while (true) {
				yield delegate
			}
		},
		reference = new Reference(generate())

	return reference.has(f)
}

test(integrationDelegateForwardReference)
