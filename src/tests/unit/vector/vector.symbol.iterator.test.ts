import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorSymbolIterator() {
	const vector = new Vector([true]),
		[is] = vector

	return is
}

test(vectorSymbolIterator)
