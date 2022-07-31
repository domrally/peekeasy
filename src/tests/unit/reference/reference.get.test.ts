import type { Delegate } from '../../../exports/exports'
import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function referenceGet() {
	const delegate = [true] as unknown as Delegate & [boolean],
		[reference] = new Reference(delegate)

	return reference
}

test(referenceGet)
