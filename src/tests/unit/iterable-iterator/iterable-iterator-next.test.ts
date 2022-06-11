import { IterableIterator } from '../../../exports/exports'
import { test } from '../../test.test'

function next() {
	const { next } = new IterableIterator(true),
		result = next(),
		{ value } = result

	return value
}

test(next)
