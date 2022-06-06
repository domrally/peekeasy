import Peekeasy from '../../exports/exports'

// states must implement Event<[]>
class FizzBuzzState extends Peekeasy.Event<[]> {
	constructor(
		public word?: string,
		private index?: number,
		// in order to activate this state need to create a delegate
		private delegate = new Peekeasy.Delegate<[]>()
	) {
		super(delegate)
	}

	// functions must not be methods
	count = (count: number) => {
		if (!this.index) this.word = `${count}`

		// activate state if the count is divisible by the index
		if (!(this.index && count % this.index)) this.delegate()
	}
}

// pass all legal states to the state pattern
const fizzbuzz = Peekeasy.vectorize(
	new FizzBuzzState(),
	new FizzBuzzState('fizz', 3),
	new FizzBuzzState('buzz', 5),
	new FizzBuzzState('fizzbuzz', 15)
)

for (let i = 1; i <= 100; i++) {
	// called on all states
	fizzbuzz.count(i)

	// return values always come from the current state
	console.log(fizzbuzz.word)
}
