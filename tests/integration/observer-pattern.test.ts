import { Caller } from '../../code/exports'
import { assert } from 'console'

class Subject<T> extends Caller<[T]> {
	subscribe({ notify }: { notify(t: T): void }) {
		this.callbacks.add(notify)
	}
}

async function test() {
	const subject = new Subject<boolean>(),
		observer = { notify: message => (is = message) }

	let is = false
	subject.subscribe(observer)
	subject.call(true)

	return is
}

try {
	assert(test(), '❌ observer-pattern')
} catch (e) {
	assert(false, '❌ observer-pattern: ', e)
}
