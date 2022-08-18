import { Behavior } from '../../../exports/exports'
import { test } from '../../test.test'

async function behaviorFallback() {
	let is = false

	const tree = new Behavior(
		() => Promise.reject(),
		() => {
			is = true
			return Promise.resolve()
		}
	)

	await tree()

	return is
}

test(behaviorFallback)
