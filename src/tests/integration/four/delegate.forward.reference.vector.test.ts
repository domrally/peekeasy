import { Delegate, Forward, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateForwardReferenceVector() {
	const //
		f = () => {},
		forward = new Forward(f),
		delegate = new Delegate(forward),
		generate = function* () {
			while (true) {
				yield delegate
			}
		},
		reference = new Reference(generate()),
		vector = new Vector(reference),
		[has] = vector.has(f)

	return has
}

test(integrationDelegateForwardReferenceVector)
