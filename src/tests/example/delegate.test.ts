import { Action, Delegate } from '../../exports/exports'

const forward = new Set<Action<[string, string]>>(),
	delegate = new Delegate(forward)

delegate.then(async message => console.log(...message))

// Hello, delegate!
forward.forEach(f => f('Hello,', 'delegate!'))
