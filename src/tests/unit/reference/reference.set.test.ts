import type { Delegate } from '../../../exports/exports'
import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function referenceSet() {
	const delegate = [false] as unknown as Delegate & [boolean],
		reference = new Reference(delegate)

	return (reference[0] = true)
}

test(referenceSet)
