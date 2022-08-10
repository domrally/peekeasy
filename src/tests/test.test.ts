import { assert, warn } from 'console'

export async function test(test: () => Promise<boolean>) {
	try {
		warn((await test()) ? `\t✅ ${test.name}` : `\t❌ ${test.name}`)
	} catch (e) {
		assert(false, `\n\t❌ ${test.name}: \n\t\t${e}`)
	}
}
