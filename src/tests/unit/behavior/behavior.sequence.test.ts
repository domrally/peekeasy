import { Behavior } from '../../../exports/exports'
import { test } from '../../test.test'

async function behaviorSequence() {
	let is = false

	try {
		const tree = new Behavior([
			async () => (is = true),
			async () => Promise.reject(),
		])

		await tree()

		return false
	} catch {
		return is
	}
}

test(behaviorSequence)
