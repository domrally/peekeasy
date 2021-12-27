# State Planner
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

tools for proxy events in typescript

## how to use

```ts
class Test {
    constructor(public text?: string, private onAct?: string) { }
    act = () => console.log(this.onAct)
}

// decouple event emmission from event subscription
const { caller, listeners } = new EventForwarder(new Test())

// add event listener
const test = new Test('Hello,', 'world!')
listeners.add(test)

// get text property from listener -> 'Hello,'
console.log(caller.text)

// call act event on all listeners -> 'world!'
caller.act()

```

## what to import

### web
```js
import { EventForwarder } from 'https://cdn.skypack.dev/mealtime?min'
```

### node
```
npm i mealtime
```
```js
import { EventForwarder } from 'mealtime'
```

### deno
```ts
import { EventForwarder } from 'https://cdn.skypack.dev/mealtime?dts'
```
