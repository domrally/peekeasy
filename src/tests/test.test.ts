import { assert, warn } from 'console'

export function test(test: () => boolean) {
	try {
		warn(test() ? `\tâ ${test.name}` : `\tâ ${test.name}`)
	} catch (e) {
		assert(false, `â ${test.name}: `, e)
	}
}
