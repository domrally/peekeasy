import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateSymbolAsyncIterator() {
	const delegate = new Delegate()

	for await ([] of delegate) {
		break
	}

	return true
}

test(delegateSymbolAsyncIterator)
