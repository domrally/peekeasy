import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardForEach() {
	let //
		is = false,
		f = (si: boolean) => (is = si),
		forward = new Forward(f)

	forward.forEach(f => f(true))

	return is
}

test(forwardForEach)
