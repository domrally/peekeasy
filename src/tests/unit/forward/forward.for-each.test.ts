import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardForEach() {
	let is = false

	const forward = new Forward(false),
		f = (si: boolean) => (is = si)

	forward.add(f)
	forward.forEach(f => f(true))

	return is
}

test(forwardForEach)
