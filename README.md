# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```ts
abstract class Player {
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

   constructor( ...players: Player[] ) {
      super()

      for ( const player of players ) {
         const select = () => this.#delegate( player )

         const { add } = player.onSelect

         add( select )
      }

      return this.#delegate() as any
   }
}

```
## importing
### javascript or deno
```js
import { Context } from 'https://cdn.skypack.dev/mealtime'
```
### node
```
npm i mealtime
```
```js
import { Context } from 'mealtime'
```
### html
```html
<script type="module">
    import { Context } from 'https://cdn.skypack.dev/mealtime'	
</script>
```
