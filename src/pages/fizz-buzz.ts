import Peekeasy from '../exports/exports'

class FizzBuzzState extends Peekeasy.WeakEvent<[]> {
	constructor(
		public word?: string,
		private index?: number,
		private claimState = new Peekeasy.Event<[]>()
	) {
		super(claimState)
	}

	count = (count: number) => {
		if (!this.index) this.word = `${count}`

		if (!(this.index && count % this.index)) this.claimState()
	}
}

const fizzbuzz = Peekeasy.State(
	new FizzBuzzState(),
	new FizzBuzzState('fizz', 3),
	new FizzBuzzState('buzz', 5),
	new FizzBuzzState('fizzbuzz', 15)
)

for (let i = 1; i <= 100; i++) {
	fizzbuzz.count(i)

	console.log(fizzbuzz.word)
}
