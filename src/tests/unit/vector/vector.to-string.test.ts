import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorToString() {
	new Vector([true]).toString()

	return true
}

test(vectorToString)
