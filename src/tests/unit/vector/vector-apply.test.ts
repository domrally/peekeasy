import { IterableIterator, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function apply() {
	const ii = new IterableIterator(true),
		vector = new Vector(ii),
		result = vector()

	return result === ii
}

test(apply)
