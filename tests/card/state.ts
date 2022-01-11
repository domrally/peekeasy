import { Holder, Sender } from '../../code/index.js'

interface Action { }
interface Type { }
interface Effect { }

abstract class Card extends Set<Card> { 
	constructor() { 
		super()
		return new Holder<this>().held
	}
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
	constructor() {
		super()

		const { held, hold } = new Holder<Card>()

		const drawPile = Object.assign(() => console.log('draw'), new East())

		listeners.add(drawPile)
		listeners.add(hand)
		listeners.add(table)
		listeners.add(discardPile)

		return held
	}
}

const { send: activeCard, sent: deck } = new Sender<Card>()

const pikachu = () => { }
pikachu.type = new Water()
pikachu.action = new Attack()
pikachu.effect = new Asfdasdf()

deck.add(pikachu)


