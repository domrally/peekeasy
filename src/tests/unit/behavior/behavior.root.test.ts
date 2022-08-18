import { Behavior } from '../../../exports/exports'
import { test } from '../../test.test'

async function behaviorRoot() {
	let is = false
	const tree = new Behavior(new Behavior(async () => (is = true)))

	await tree()

	return is
}

test(behaviorRoot)
