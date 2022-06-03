import Peekeasy, { Event, WeakEvent } from '../exports/exports'

interface FizzBuzz {
	onMessage: WeakEvent<[string]>
	count(index: number): void
}
class FizzBuzz {
	constructor() {
		const onMessage = new Peekeasy.Event('-1')
		return {
			...this,
			onMessage: new Peekeasy.WeakEvent(this.onMessage as Event<[string]>),
			count(index: number) {
				const zzif = index % 3,
					zzub = index % 5,
					message =
						zzif && zzub
							? index.toString()
							: `${!zzif ? 'fizz' : ''}${!zzub ? 'buzz' : ''}`

				onMessage(message)
			},
		}
	}
}

const fizzBuzz = new FizzBuzz()

fizzBuzz.onMessage.add(console.log)

for (let i = 0; i < 100; i++) {
	fizzBuzz.count(i)
}
