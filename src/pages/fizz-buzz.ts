import Peekeasy from '../exports/exports'

class FizzBuzzState extends Peekeasy.WeakEvent<[]> {
	constructor(
		private index?: number,
		public word?: string,
		private claimState = new Peekeasy.Event<[]>()
	) {
		super(claimState)
	}

	count = (count: number) => {
		if (!this.index) {
			this.word = count.toString()
		}

		if (!(this.index && count % this.index)) {
			this.claimState()
		}
	}
}

const fizzbuzz: FizzBuzzState = Peekeasy.State(
	new FizzBuzzState(),
	new FizzBuzzState(3, 'fizz'),
	new FizzBuzzState(5, 'buzz'),
	new FizzBuzzState(15, 'fizzbuzz')
)

for (let i = 0; i < 100; i++) {
	fizzbuzz.count(i)

	console.log(fizzbuzz.word)
}
