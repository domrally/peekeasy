# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=line count&color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.ts) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```js
const a = {
  word: 'hello'
}
const b = {
  word: 'world'
}

const context = new Context() // new Context<{ word: string }>()
const { target } = context

context.target = a
console.log(target.word) //> hello

context.target = b
console.log(target.word) //> world

target.word = 'meal'
console.log(target.word) //> meal

const observe = async function () {
  for await (const { value } of context) {
    console.log(value)
  }
}()
target.word = 'time' //> time
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
