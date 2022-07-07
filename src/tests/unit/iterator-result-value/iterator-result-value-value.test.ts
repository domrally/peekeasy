import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

function value() {
	const value = new Reference({ is: true })

	return value.is
}

test(value)
