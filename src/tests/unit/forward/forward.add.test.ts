import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

class Subject {
	#delegate = new Forward<[]>()

	publish() {
		this.#delegate()
	}

	subscribe({ notify }: { notify(): void }) {
		this.#delegate.add(notify)
	}
}

function add() {
	const subject = new Subject(),
		observer = {
			notify() {
				is = true
			},
		}

	let is = false
	subject.subscribe(observer)
	subject.publish()

	return is
}

test(add)
