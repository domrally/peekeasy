import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardClear() {
	let //
		is = false,
		forward = new Forward(si => (is = si))

	forward.clear()

	forward(true)

	return !is && !forward.size
}

test(forwardClear)
