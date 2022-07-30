import { Event, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

function value() {
	const value = new Reference(
		new (class extends Event {
			is = true
		})()
	)

	return value.is
}

test(value)
