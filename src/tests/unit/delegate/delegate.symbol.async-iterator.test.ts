import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateSymbolAsyncIterator() {
	let //
		is = false,
		f = (_: boolean) => {},
		set = new Set([f]),
		delegate = new Delegate(set)

	;(async () => {
		for await ([is] of delegate) {
			break
		}
	})()

	await new Promise(resolve => setTimeout(resolve, 0))

	set.forEach(f => f(true))

	await new Promise(resolve => setTimeout(resolve, 0))

	return is
}

test(delegateSymbolAsyncIterator)
