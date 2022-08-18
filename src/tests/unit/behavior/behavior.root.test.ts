import { Behavior } from '../../../exports/exports'
import { test } from '../../test.test'

async function behaviorRoot() {
	let is = false
	const tree = new Behavior(
		new Behavior(() => {
			is = true
			return Promise.resolve()
		})
	)

	await tree()

	return is
}

test(behaviorRoot)
