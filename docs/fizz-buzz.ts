import { Event } from '../src/events/event'
import { WeakEvent } from '../src/events/weak-event'

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

const fizzBuzz = new FizzBuzz()

fizzBuzz.onMessage.add(console.log)

while (fizzBuzz.count) {
	fizzBuzz.count()
}
