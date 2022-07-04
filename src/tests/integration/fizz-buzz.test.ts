import { Delegate, Event, Reference, Vector } from '../../exports/exports'
import { warn } from 'console'
import { test } from '../test.test'

// states must implement Event<[]>
class FizzBuzzState extends Event<[]> {
	constructor(
		public word: string,
		private index?: number,
		// in order to activate this state need to create a delegate
		private delegate = new Delegate<[]>()
	) {
		super(delegate)
	}

	getWord = () => this.word

	// functions must not be methods
	count = (count: number) => {
		if (!this.index) this.word = `${count}`

		// activate state if the count is divisible by the index
		if (!(this.index && count % this.index)) this.delegate()
	}
}

function fizzbuzz() {
	// pass all legal states to the state pattern
	const context = [
			new FizzBuzzState(''),
			new FizzBuzzState('fizz', 3),
			new FizzBuzzState('buzz', 5),
			new FizzBuzzState('fizzbuzz', 15),
		],
		vector = new Vector(context),
		reference = new Reference(context)

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
