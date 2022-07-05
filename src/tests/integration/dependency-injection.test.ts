import { Delegate, Event } from '../../exports/exports'
import { test } from '../test.test'

class Consumer {
	constructor(onTest: Event<[boolean]>) {
		onTest.add(this.consume)
	}

	consume = (is: boolean) => (this.is = is)

	is = false
}

function dependencyInjection() {
	const delegate = new Delegate<[boolean]>([true]),
		event = new Event(delegate)

	const consumer = new Consumer(event)

	return consumer.is
}

test(dependencyInjection)
