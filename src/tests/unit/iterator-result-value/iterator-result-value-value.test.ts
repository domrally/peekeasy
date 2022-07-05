import { Reference } from '../../../exports/exports'
import { test } from '../../test.test'

function value() {
	const ii = new Set<{ is: boolean }>()
	ii.add({ is: true })
	const value = new Reference(ii)

	let is = true
	for (const v of ii) {
		is = v.is && value.is
	}

	ii.clear()

	return is
}

test(value)
