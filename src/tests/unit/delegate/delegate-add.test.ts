import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

class Subject<T> extends Delegate<[T]> {
	subscribe = ({ notify }: { notify: (t: T) => void }) => {
		this.add(notify)
	}
}

function add() {
	const subject = new Subject<boolean>([false]),
		observer = { notify: (message: boolean) => (is = message) }

	let is = false
	subject.subscribe(observer)
	subject(true)

	return is
}

test(add)
