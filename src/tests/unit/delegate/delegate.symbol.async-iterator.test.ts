import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateSymbolAsyncIterator() {
	let is = false

	const forward = new Forward(true),
		delegate = new Delegate(forward)

	for await ([is] of delegate) {
		break
	}

	return is
}

test(delegateSymbolAsyncIterator)
