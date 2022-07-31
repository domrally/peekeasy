import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardDelete() {
	let is

	const forward = new Forward(false),
		f = (si: boolean) => (is = si)

	forward.delete(f)
	forward.add(f)
	forward.delete(f)
	forward(true)

	return !is && !forward.size
}

test(forwardDelete)
