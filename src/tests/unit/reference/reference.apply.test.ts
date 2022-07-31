import type { Delegate } from '../../../exports/exports'
import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function referenceApply() {
	const f = (() => true) as unknown as Delegate & (() => true),
		forward = new Reference(f)

	return forward()
}

test(referenceApply)
