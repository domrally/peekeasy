import { Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateReference() {
	const [bool] = new Vector(new Reference(true as any))

	return bool
}

test(integrationDelegateReference)
