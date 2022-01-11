import { Holder } from '../../code/index.js'

export abstract class Player {
	constructor() {	
		const { held, hold } = new Holder<Player>();

		(function setState(player: Player) {
			held.onNext = null

			hold(player)
	
			held.onNext = setState
		})(this)

		return held
	}

	protected onNext: (player: Player) => void
}
