# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

toolset for proxied event delegation in typescript

## how to use

```ts
class Actor {
    constructor(
        private onAct?:  string,
        private onRest?: string,
    ) { }

    act  = () => console.log(this.onAct)
    rest = () => console.log(this.onRest)
}

// decouple event emmission from event subscription
const {
    weakSet: listeners,
    proxy:   emitter
} = new EventDelegate<Actor>(new Actor())

// call act on all listeners  -> undefined
emitter.act()

// create subscriber
const actor = new Actor('Hello,', 'world!')
 
// add subscription
listeners.add(actor)

// call act on all listeners  -> 'Hello,'
emitter.act()

// call rest on all listeners -> 'world!'
emitter.rest()

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
