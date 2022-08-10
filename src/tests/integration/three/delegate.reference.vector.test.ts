import { warn } from 'console'
import { Delegate, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

class FizzBuzzState extends Delegate {
	constructor(public word: string, private index?: number) {
		super()
	}

	count(count: number) {
		if (!this.index) this.word = `${count}`

		// activate state if the count is divisible by the index
		if (!(this.index && count % this.index)) this.forward.forEach(f => f())
	}
}

async function integrationDelegateReferenceVector() {
	let vector = new Vector([
			new FizzBuzzState(''),
			new FizzBuzzState('fizz', 3),
			new FizzBuzzState('buzz', 5),
			new FizzBuzzState('fizzbuzz', 15),
		]),
		[current] = vector,
		generate = function* () {
			while (true) {
				yield current
			}
		}

	for (const state of vector) {
		state.add(() => (current = state))
	}

	const reference = new Reference(generate())

	let row = '\t'

	for (let i = 1; i <= 16; i++) {
		vector.count(i)

		const word = `${i < 10 ? ' ' : ''}${i}. ${reference.word}`
		row += `${word}${word.length > 7 ? '\t' : '\t\t'}`

		if (i % 4) continue

		warn(row)
		row = '\t'
	}

	return true
}

test(integrationDelegateReferenceVector)
