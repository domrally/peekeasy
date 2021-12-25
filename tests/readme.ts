import { SetHandler, WeakerSet } from '../code/index.js'

type Action = () => void

class Event {
	private spiesForSend = new SetHandler<Action>()

	public spyOnSend: WeakSet<Action> = new WeakerSet(this.spiesForSend)

	sendToSpies: Action = new Proxy(() => { }, this.spiesForSend)
}

const event = new Event()

event.spyOnSend.add(() => console.log('Hello, world!'))

event.sendToSpies()

console.log('✅ readme')
