import { IterableIterator, IteratorResultValue } from '../../../exports/exports'
import { test } from '../../test.test'

function value() {
	const ii = new IterableIterator({ is: true }),
		value = new IteratorResultValue(ii)

	let is = true
	for (const v of ii) {
		is = is && v.is && value.is
	}

	return is
}

test(value)
