import { Behavior } from '../../exports/exports'

const tree = new Behavior(
	false,
	//
	() => Promise.reject(),
	//
	() => Promise.resolve('Hello, behavior!')
)

tree().then(console.log)
