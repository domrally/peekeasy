import { Action, Delegate, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateReferenceVector() {
	let //
		is = false,
		f = () => (is = true),
		set = new Set<Action>(),
		generate = function* () {
			while (true) {
				yield set
			}
		},
		reference = new Reference(generate()),
		delegate = new Delegate(reference),
		vector = new Vector(set)

	delegate.add(f)

	vector()

	return is
}

test(integrationDelegateReferenceVector)
