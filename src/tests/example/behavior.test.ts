import { Behavior } from '../../exports/exports'

const tree = new Behavior(
	//
	() => Promise.reject(),
	//
	new Behavior([
		//
		() => Promise.resolve(),
		//
		(s: string) => console.log(s),
	])
)

tree('Hello, behavior!')
