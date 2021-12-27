# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

tools for event delegation in typescript

## how to use

```ts
class Test {
    constructor(public text?: string, private onAct?: string) { }
    act = () => console.log(this.onAct)
}

// decouple event emmission from event subscription
const { event, delegate } = new EventDelegate(new Test())

// add event listener
const test = new Test('Hello,', 'world!')
event.add(test)

// get text property from delegate -> 'Hello,'
console.log(delegate.text)

// emit act event to all listeners -> 'world!'
delegate.act()

```

## what to import

### web
```js
import { EventDelegate } from 'https://cdn.skypack.dev/mealtime?min'
```

### node
```
npm i mealtime
```
```js
import { EventDelegate } from 'mealtime'
```

### deno
```ts
import { EventDelegate } from 'https://cdn.skypack.dev/mealtime?dts'
```
