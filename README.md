# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

toolset for proxied delegation in typescript

## how to use

```ts
class Example {
    constructor(private message: string = 'empty') { }
    test() {
        console.log(this.message)
    }
}
const example: Example = new Example('Hello, world!')

// common pattern
const subscriber: Set<Example> = new Set()
subscriber.add(example)
subscriber.forEach(sub => sub.test())

// our syntax
const subscribers: Set<Example>   = new SetHandler(),
      onPublish: WeakSet<Example> = new WeakerSet(subscribers),
      defaultCase: Example        = new Example(),
      publisher: Example          = new Proxy(defaultCase, subscribers)
onPublish.add(example)
publisher.test()

```

## what to import

### web
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
