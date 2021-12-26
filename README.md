# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

abstracted proxy delegation pattern made in typescript

## how to use

```ts
type Action = () => void
class Event {
    spies:        Set<Action> & ProxyHandler<Action> = new SetHandler()
    spyOnSending: WeakSet<Action>                    = new WeakerSet(this.spies)
    sendToSpies:  Action                             = new Proxy(() => { }, this.spies)
}

const { spyOnSending, sendToSpies } = new Event(),
        log                         = () => console.log('Hello, world!')

spyOnSending.add(log)

sendToSpies()

```

## what to import

### javascript
```js
import { SetHandler, WeakerSet } from 'https://cdn.skypack.dev/mealtime?min'
```

### node
```
npm i mealtime
```
```js
import { SetHandler, WeakerSet } from 'mealtime'
```

### deno
```ts
import { SetHandler, WeakerSet } from 'https://cdn.skypack.dev/mealtime?dts'
```
