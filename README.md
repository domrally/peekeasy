# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions)

toolset for proxied delegation in typescript

## how to use

```ts
class MyClass {
    constructor(
        private start: string,
        private end: string,
    ) { }

    sendStart() {
        console.log(this.start)
    }

    sendEnd() {
        console.log(this.end)
    }
}

class Event {
    spies: Set<MyClass> & ProxyHandler<MyClass> = new SetHandler()

    defaultCase: MyClass                        = new MyClass('no', 'spies')
    spySender: MyClass                          = new Proxy(this.defaultCase, this.spies)
	 
    spyOnSender: WeakSet<MyClass>               = new WeakerSet(this.spies)
}

const { spyOnSender, spySender } = new Event(),
        test                     = new MyClass('Hello,', 'world!')

spyOnSender.add(test)

spySender.sendStart()
spySender.sendEnd()
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
