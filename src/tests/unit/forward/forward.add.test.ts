import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardAdd() {
	let is = false

	const forward = new Forward(true),
		f = (si: boolean) => (is = si)

	forward.add(f)

	return is && forward.has(f)
}

test(forwardAdd)
