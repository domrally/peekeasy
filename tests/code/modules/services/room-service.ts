import { Sender } from '../../../../code/index.js'
import { Events } from '../events/events.js'
import { Publisher } from '../events/publisher.js'

export class RoomService implements Publisher<Events.onTest> {
	static init?() {
		delete this.init

		return new RoomService()
	}

	private constructor() {
		room = this
	}

	get onTest() {
		return this.test.sent
	}
	test = new Sender<() => void>()
}

let room: RoomService

export abstract class Consumer {
	protected get roomService() {
		return room
	}
}
