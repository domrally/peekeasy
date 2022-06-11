import { assert, warn } from 'console'

export function test(test: () => boolean) {
	try {
		warn(test() ? `\t✅ ${test.name}` : `\t❌ ${test.name}`)
	} catch (e) {
		assert(false, `❌ ${test.name}: `, e)
	}
}
