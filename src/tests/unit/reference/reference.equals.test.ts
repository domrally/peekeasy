import type { Delegate } from '../../../exports/exports'
import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function referenceEquals() {
	const delegate = {} as Delegate,
		reference = new Reference(delegate)

	return Object.getPrototypeOf(reference) === Object.getPrototypeOf(delegate)
}

test(referenceEquals)
