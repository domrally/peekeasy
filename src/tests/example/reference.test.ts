import { Reference } from '../../exports/exports'

function* generate() {
	while (true) {
		yield 'Hello, reference!'
	}
}

const reference = new Reference(generate())

// Hello, reference!
console.log(`${reference}`)
