import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardAdd() {
	let //
		is = false,
		f = (si: boolean) => (is = si),
		forward = new Forward<[boolean]>()

	//
	forward.add(f)
	forward(true)

	return is && forward.has(f)
}

test(forwardAdd)
