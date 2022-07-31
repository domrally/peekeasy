import { Delegate, Forward } from '../../exports/exports'
import { test } from '../test.test'

class Consumer {
	constructor(onTest: Delegate<[boolean]>) {
		onTest.add(this.consume.bind(this))
	}

	consume(is: boolean) {
		this.is = is
	}

	is = false
}

function dependencyInjection() {
	const delegate = new Forward(true)

	const consumer = new Consumer(new Delegate(delegate))

	return consumer.is
}

test(dependencyInjection)
