import { Event, State, WeakEvent, WeakState } from '../src/src'

class FizzBuzz {
	#onMessage = new Event('-1')
	onMessage = new WeakEvent(this.#onMessage)

	#count = 0
	count? = () => {
		const zzif = this.#count % 3,
			zzub = this.#count % 5,
			isNumber = zzif && zzub

		this.#onMessage(
			isNumber
				? this.#count.toString()
				: `${!zzif ? 'fizz' : ''}${!zzub ? 'buzz' : ''}`
		)

		if (++this.#count > 100) {
			delete this.count
		}
	}
}

const a = new FizzBuzz(),
	b = new FizzBuzz(),
	fizzBuzz = State(a),
	fizzBuzzWeak = WeakState(fizzBuzz)

fizzBuzzWeak.onMessage.add(console.log)
while (fizzBuzzWeak.count) {
	fizzBuzzWeak.count()
}
