import { assertContext } from './context.test.js'
import { assertMealtime } from './mealtime.test.js'
import { assertState } from './state.test.js'
import { assertTransitions } from './transitions.test.js'
import { assertTriggers } from './triggers.test.js'

(async () => {
	console.log('🧪 testing mealtime...')
	const tests: [() => void, string][] = [
		[assertTriggers, 'triggers'],
		[assertTransitions, 'transitions'],
		[assertState, 'state'],
		[assertContext, 'context'],
		[assertMealtime, 'main'],
	]
	for await (const [assert, name] of tests) {
		try {
			assert()
			console.log(`✅ ${name}`)
		} finally { }
	}
})()