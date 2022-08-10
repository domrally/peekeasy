import { warn } from 'console'
import { Reference, Vector } from '../../../exports/exports'

class FizzBuzzState {
	constructor(
		private claim: (state: FizzBuzzState) => void,
		public word: string,
		private index?: number
	) {}

	count(count: number) {
		if (!this.index) this.word = `${count}`

		// activate state if the count is divisible by the index
		if (!(this.index && count % this.index)) this.claim(this)
	}
}

let //
	current: any = null,
	claim = (state: FizzBuzzState) => (current = state),
	vector = new Vector([
		new FizzBuzzState(claim, ''),
		new FizzBuzzState(claim, 'fizz', 3),
		new FizzBuzzState(claim, 'buzz', 5),
		new FizzBuzzState(claim, 'fizzbuzz', 15),
	]),
	generate = function* () {
		while (true) {
			yield current
		}
	}

;[current] = vector

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
