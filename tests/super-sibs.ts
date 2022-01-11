import { EventSpeaker } from '../code'

abstract class Fighter {
	constructor(
		public attack: () => void,
		public block: () => void,
		public grab: () => void,
	) { }
	health: number
	power: number
	speed: number
}

function counter() {
}

function dodge() {
}

function punch() {
}

function kick() {
}

function toss() {
}

function choke() {
}

class sibling extends Fighter {
	constructor() {
		super(dodge, punch, choke)
	}
}

class superSib extends Fighter {
	constructor() {
		super(dodge, kick)
	}
}

class fireSib extends Fighter {
	constructor() {
		super(dodge, () => {
			kick()
			fireBall()
		})
	}
}

const { host, listeners } = new EventSpeaker<Fighter>()

listeners.add(new sibling())

host.coins++
host.B()

listeners.add(new superSib())

const fire = new fireSib()
listeners.add(fire)

host.B()

listeners.delete(fire)
