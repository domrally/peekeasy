import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardHas() {
	const forward = new Forward(true)

	return !forward.has(() => {})
}

test(forwardHas)
