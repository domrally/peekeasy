import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function forwardHas() {
	const //
		f = () => {},
		forward = new Forward(f)

	return !forward.has(() => {}) && forward.has(f)
}

test(forwardHas)
