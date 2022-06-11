import { Delegate, Event } from '../../exports/exports'
import { assert } from 'console'
import { test } from '../test.test'

class Consumer {
	constructor(onTest: Event<[boolean]>) {
		onTest.add(this.consume)
	}

	consume = (is: boolean) => {
		this.is = is
	}

	is = false
}

function dependencyInjection() {
	const delegate = new Delegate<[boolean]>(),
		event = new Event(delegate)

	const consumer = new Consumer(event)

	delegate(true)

	return consumer.is
}

test(dependencyInjection)
