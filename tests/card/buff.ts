import { EventSpeaker } from '../../code/index.js'

export abstract class Buff implements WeakSet<Buff> {
	call: (() => void) & any

	onCall: WeakSet<Buff>

	constructor() { 
		const { host, listeners } = new EventSpeaker<Buff>()

		listeners.add(this)

		this.onCall = listeners

		this.call = host

		return host
	}

	has (t: Buff) {
		return this.onCall.has(t)
	}
	
	add (t: Buff) {
		return this.onCall.add(t) as any
	}
	
	delete (t: Buff) {
		return this.onCall.delete(t)
	}
	
	get [Symbol.toStringTag] () {
		return this.onCall[Symbol.toStringTag]
	}
}
