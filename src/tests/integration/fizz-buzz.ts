import {
	Delegate,
	Event,
	IterableIterator,
	IteratorResultValue,
	Vector,
} from '../../exports/exports'

// states must implement Event<[]>
class FizzBuzzState extends Event<[]> {
	constructor(
		private word: string,
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

// pass all legal states to the state pattern
const context = new IterableIterator(
		new FizzBuzzState(''),
		new FizzBuzzState('fizz', 3),
		new FizzBuzzState('buzz', 5),
		new FizzBuzzState('fizzbuzz', 15)
	),
	vector = new Vector(context),
	getWord = new IteratorResultValue(vector.getWord()),
	counts = vector.count()

for (let i = 1; i <= 100; i++) {
	for (const count of counts) {
		count(i)
	}

	console.log(getWord())
}
