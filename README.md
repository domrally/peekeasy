# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=line count&color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.ts) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```js
class Powerable { // abstract class Powerable {
  state = ''
  power() {}
}
class TV extends Powerable {

  #context = new Context() // #context = new Context<Powerable>()
  
  constructor() {
    super()
    this.#context.target = this.#off
    return this.#context.target // return this.#context.target as any
  }
  #off = { // #off: Powerable = {
    state: 'off',
    power: () => this.#context.target = this.#on
  };
  #on = { // #on: Powerable = {
    state: 'on',
    power: () => this.#context.target = this.#off
  }
}

const tv = new TV()
console.log('tv is', tv.state) // tv is off
tv.power()
console.log('tv is', tv.state) // tv is on
```
## how to install & import
### javascript or deno
```js
import { Context } from 'https://esm.sh/mealtime'
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
    import { Context } from 'https://esm.sh/mealtime'	
</script>
```
