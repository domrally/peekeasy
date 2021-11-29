import { Delegate, WeakenedSet } from '../code/index.js'

class Player {
   constructor(public readonly name: string) { }

   #select = new Set<() => void>()

   #onSelect = new WeakenedSet( this.#select )

   get onSelect() {
      return this.#onSelect
   }

   select() {
      this.#select.forEach( e => e() )
   }
}

class SelectedPlayer extends Player {
   #delegate = Delegate<Player>()

   #onSelect( player: Player ) {
      const select = () => this.#delegate( player )

      player.onSelect.add( select )
   }

   constructor( ...players: Player[] ) {
      super('')

      players.forEach( this.#onSelect.bind(this) )

      return this.#delegate(this) as any
   }
}

const nikka = new Player( 'Nikka' )
const wolf = new Player( 'Wolf' )
const selected = new SelectedPlayer( nikka, wolf )

nikka.select()

console.log( selected.name )

wolf.select()

console.log( selected.name )
