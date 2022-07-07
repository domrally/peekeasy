import { Delegate, Event } from '../../exports/exports'
import { test } from '../test.test'

class Consumer {
	constructor(onTest: Event<[boolean]>) {
		onTest.add(this.consume.bind(this))
	}

	consume(is: boolean) {
		this.is = is
	}

	is = false
}

function dependencyInjection() {
	const delegate = new Delegate<[boolean]>([true])

	const consumer = new Consumer(new Event(delegate))

	return consumer.is
}

test(dependencyInjection)
