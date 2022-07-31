import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorToString() {
	new Vector().toString()

	return true
}

test(vectorToString)
