import { Behavior } from '../../exports/exports'

let hello = ''

const tree = new Behavior([
	async () => (hello = 'Hello, behavior!'),
	new Behavior(
		() => Promise.reject(),
		async () => console.log(hello)
	),
])

tree()
