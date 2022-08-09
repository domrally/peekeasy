import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateThen() {
	let //
		is = false,
		f = (_: boolean) => {},
		forward = new Forward(f),
		delegate = new Delegate(forward)

	;(async () => {
		;[is] = await delegate
	})()

	await new Promise(resolve => setTimeout(resolve, 0))

	forward(true)

	await new Promise(resolve => setTimeout(resolve, 0))

	return is
}

test(delegateThen)
