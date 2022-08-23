import { Delegate } from '../../exports/exports'

const set = new Set<(s: string, t: string) => void>(),
	delegate = new Delegate(set)

delegate.then(async message => console.log(...message))

// Hello, delegate!
set.forEach(f => f('Hello,', 'delegate!'))
