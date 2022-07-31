import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardSize() {
	let is = true

	const forward = new Forward()

	for (let i = 1; i < 9; i++) {
		forward.add(() => {})
		is = is && forward.size === i
	}

	return is
}

test(forwardSize)
