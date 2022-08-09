import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateSymbolAsyncIterator() {
	let //
		is = false,
		f = (_: boolean) => {},
		forward = new Forward(f),
		delegate = new Delegate(forward)

	;(async () => {
		for await ([is] of delegate) {
			break
		}
	})()

	await new Promise(resolve => setTimeout(resolve, 0))

	forward(true)

	await new Promise(resolve => setTimeout(resolve, 0))

	return is
}

test(delegateSymbolAsyncIterator)
