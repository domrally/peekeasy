import { Forward, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardReferenceVector() {
	const //
		f = () => {},
		forward = new Forward(f),
		generate = function* () {
			while (true) {
				yield forward
			}
		},
		reference = new Reference(generate()),
		[vector] = new Vector(reference),
		has = vector.has(f)

	return has
}

test(integrationForwardReferenceVector)
