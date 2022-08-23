import { Delegate, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateVector() {
	let //
		is = false,
		f = () => (is = true),
		set = new Set<() => void>(),
		delegate = new Delegate(set),
		vector = new Vector(set)

	delegate.add(f)

	vector()

	return is
}

test(integrationDelegateVector)
