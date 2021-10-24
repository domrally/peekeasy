# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=line count&color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.ts) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```js
function makeTV() {
  const tvContext = new Context()
  let volume = 50
  const off = {
    get volume() { return -1 },
    power: () => tvContext.target = on,
  };
  const on = {
    get volume() { return volume },
    set volume(v) { volume = v },
    power: () => tvContext.target = off,
  };
  tvContext.target = off;
  return tvContext.target;
}

const tv = makeTV();
tv.power();
console.log(tv.volume); // 50
tv.power();
console.log(tv.volume); // -1
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
