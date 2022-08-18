import { Behavior } from '../../../exports/exports'
import { test } from '../../test.test'

async function behaviorTask() {
	let is = false,
		tree = new Behavior(si => (is = si))

	tree(true)

	return is
}

test(behaviorTask)
