import { SetHandler } from '../code/index.js'

interface Action { }
interface Type { }
interface Effect { }

abstract class Card {
	constructor(
		protected type: Type,
		protected action: Action,
		protected effect: Effect,
	) { }
}

class Attack implements Action { }
class Draw implements Action { }

class Water implements Type { }
class Fire implements Type { }

class ExtraAction implements Effect { }
class Asfdasdf implements Effect { }

class North extends Card {
	constructor() {
		super(new Water(), new Attack(), new Asfdasdf())
	}
}

class West extends Card {
	constructor() {
		super(new Fire(), new Attack(), new ExtraAction())
	}
}

class East extends Card {
	constructor() {
		super(new Fire(), new Draw(), new Asfdasdf())
	}
}

interface CardObserver { }

class PlayingCard extends Card {
	// behavior
	#behavior = new SetHandler<Card>()
	constructor() {
		super(new Attack(), new Water(), new Asfdasdf())

		return new Proxy<this>(this, this.#behavior)
	}
}

const deck: Iterable<PlayingCard> = []


