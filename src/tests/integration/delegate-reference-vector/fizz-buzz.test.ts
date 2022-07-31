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
		if (!(this.index && count % this.index)) this.forward()
	}
}

function fizzbuzz() {
	// pass all legal states to the state pattern
	const vector = new Vector(
			new FizzBuzzState(''),
			new FizzBuzzState('fizz', 3),
			new FizzBuzzState('buzz', 5),
			new FizzBuzzState('fizzbuzz', 15)
		),
		reference = new Reference(...vector)

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

test(fizzbuzz)
