import { assertContext } from './context.test.js';
import { assertMain } from './main.test.js';
import { assertState } from './state.test.js';
import { assertTransitions } from './transitions.test.js';
import { assertTriggers } from './triggers.test.js';
(async () => {
    console.log('🧪 testing mealtime...');
    const tests = [
        [assertTriggers, 'triggers'],
        [assertTransitions, 'transitions'],
        [assertState, 'state'],
        [assertContext, 'context'],
        [assertMain, 'main'],
    ];
    for await (const [assert, name] of tests) {
        try {
            assert();
            console.log(`✅ ${name}`);
        }
        finally { }
    }
})();
