import { assertContext } from './context.test.js'
import { assertMealtime } from './proxy.test.js'
import { assertState } from './state.test.js'
import { assertTransitions } from './transitions.test.js'
import { assertTriggers } from './triggers.test.js'

(async () => {
	console.log('🧪 testing mealtime...')
	const tests: [() => Promise<void>, string][] = [
		[assertTriggers, 'triggers'],
		[assertTransitions, 'transitions'],
		[assertState, 'state'],
		[assertContext, 'context'],
		[assertMealtime, 'mealtime'],
	]
	for await (const [assert, name] of tests) {
		try {
			await assert()
			console.log(`✅ ${name}`)
		} finally { }
	}
})()