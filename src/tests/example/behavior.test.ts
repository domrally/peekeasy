import { Behavior } from '../../exports/exports'

const behavior = new Behavior([
	async data => (data.message = `Hello, ${data.message}!`),
	async ({ message }) => console.log(message),
])

// Hello, behavior!
behavior({ message: 'behavior' })
