import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateThen() {
	let //
		is = false,
		f = (_: boolean) => {},
		set = new Set([f]),
		delegate = new Delegate(set)

	;(async () => {
		;[is] = await delegate
	})()

	await new Promise(resolve => setTimeout(resolve, 0))

	set.forEach(f => f(true))

	await new Promise(resolve => setTimeout(resolve, 0))

	return is
}

test(delegateThen)
