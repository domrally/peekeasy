import { Event } from '../../src/src'
import { assert } from 'console'

class Subject<T> extends Event<[T]> {
	subscribe({ notify }: { notify(t: T): void }) {
		this.add(notify)
	}
}

async function test() {
	const subject = new Subject<boolean>(false),
		observer = { notify: (message: boolean) => (is = message) }

	let is = false
	subject.subscribe(observer)
	subject(true)

	return is
}

try {
	assert(test(), '❌ observer-pattern')
} catch (e) {
	assert(false, '❌ observer-pattern: ', e)
}
