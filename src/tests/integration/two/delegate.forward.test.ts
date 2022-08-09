import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

class Consumer {
	constructor(onTest: Delegate<[boolean]>) {
		onTest.add(this.consume.bind(this))
	}

	consume(is: boolean) {
		this.is = is
	}

	is = false
}

async function integrateDelegateForward() {
	const forward = new Forward(bool => {
			consumer.is = bool
		}),
		consumer = new Consumer(new Delegate(forward))

	forward(true)

	return consumer.is
}

test(integrateDelegateForward)
