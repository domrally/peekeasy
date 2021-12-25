import { SetHandler, WeakerSet } from '../code/index.js'

type Action = () => void

class Event {
	spiesForSend: SetHandler<Action> = new SetHandler()
	spyOnSend: WeakSet<Action> = new WeakerSet(this.spiesForSend)
	sendToSpies: Action = new Proxy(() => { }, this.spiesForSend)
}

const { spyOnSend, sendToSpies } = new Event(),
	log = () => console.log('Hello, world!')

spyOnSend.add(log)
sendToSpies()

console.log('✅ readme')
