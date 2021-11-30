# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```ts
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

```
## importing
### javascript
```js
import { Delegate, WeakenedSet } from 'https://cdn.skypack.dev/mealtime?min'
```
### node
```
npm i mealtime
```
```js
import { Delegate, WeakenedSet } from 'mealtime'
```
### deno
```ts
import { Delegate, WeakenedSet } from 'https://cdn.skypack.dev/mealtime?dts'
```
