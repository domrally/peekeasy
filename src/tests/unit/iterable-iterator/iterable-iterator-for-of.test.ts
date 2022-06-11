import { assert } from 'console'
import { IterableIterator } from '../../../exports/exports'
import { test } from '../../test.test'

function forOf() {
	let i = 0

	for (const index of new IterableIterator(1, 2, 3)) {
		assert(++i == index, '❌ for of index is not correct')
	}

	return true
}

test(forOf)
