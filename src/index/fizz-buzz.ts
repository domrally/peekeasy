import Peekeasy from '../exports/exports'

class FizzBuzz {
	#onMessage = new Peekeasy.Event('-1')
	onMessage = new Peekeasy.WeakEvent(this.#onMessage)

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
	fizzBuzz = Peekeasy.State(a),
	fizzBuzzWeak = Peekeasy.WeakState(fizzBuzz)

fizzBuzzWeak.onMessage.add(console.log)
while (fizzBuzzWeak.count) {
	fizzBuzzWeak.count()
}
