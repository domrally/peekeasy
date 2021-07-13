import { assertContext } from './tests/context.test.js'
import { assertMain } from './tests/main.test.js'
import { assertState } from './tests/state.test.js'
import { assertTransitions } from './tests/transitions.test.js'
import { assertTriggers } from './tests/triggers.test.js'

(async () => {
	console.log('🧪 testing mealtime...')
	const tests: [() => void, string][] = [
		[assertTriggers, 'triggers'],
		[assertTransitions, 'transitions'],
		[assertState, 'state'],
		[assertContext, 'context'],
		[assertMain, 'main'],
	]
	for await (const [assert, name] of tests) {
		try {
			assert()
			console.log(`✅ ${name}`)
		} finally { }
	}
})()