import { assert, warn } from 'console'

export async function test(test: () => Promise<boolean>) {
	try {
		warn((await test()) ? `\t✅ ${test.name}` : `\t❌ ${test.name}`)
	} catch (e) {
		assert(false, `❌ ${test.name}: `, e)
	}
}
