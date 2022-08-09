import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardApply() {
	let is = false

	const forward = new Forward(si => (is = si))

	forward(true)

	return is
}

test(forwardApply)
