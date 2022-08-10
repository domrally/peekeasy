import { Action, Delegate } from '../../exports/exports'

const set = new Set<Action<[string, string]>>(),
	delegate = new Delegate(set)

delegate.then(async message => console.log(...message))

// Hello, delegate!
set.forEach(f => f('Hello,', 'delegate!'))
