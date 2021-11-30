# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```ts
abstract class Page {
   constructor (public readonly name: string) { }

   #select = new Set<() => void>()

   #onSelect = new WeakenedSet(this.#select)

   get onSelect () {
      return this.#onSelect
   }

   select () {
      this.#select.forEach(e => e())
   }
}

class CurrentPage extends Page {
   #delegate = Delegate<Page>()

   #onSelect (page: Page) {
      const select = () => this.#delegate(page)

      page.onSelect.add(select)
   }

   constructor (...pages: Page[]) {
      super('')

      const onSelect = this.#onSelect.bind(this)

      pages.forEach(onSelect)

      return this.#delegate(this) as any
   }
}

class HomePage extends Page {
   constructor() {
      super('Home')
   }
}

class SettingsPage extends Page {
   constructor() {
      super('Settings')
   }
}

const home        = new HomePage(),

      settings    = new SettingsPage(),

      currentPage = new CurrentPage(home, settings)

home.select()     // currentPage.name === 'Home'

settings.select() // currentPage.name === 'Settings'

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
