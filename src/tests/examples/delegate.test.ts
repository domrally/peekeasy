import { Delegate, Forward } from '../../exports/exports'

const forward = new Forward<[string, string]>(),
	delegate = new Delegate(forward)

delegate.then(async message => console.log(...message))

// Hello, delegate!
forward('Hello,', 'delegate!')
