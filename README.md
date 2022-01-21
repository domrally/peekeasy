# Peekeasy
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black)](https://github.com/domrally/peekeasy/blob/main/build/types/index.d.ts)
[![](https://badgen.net/badge/license/Fair?color=grey)](https://github.com/domrally/peekeasy/blob/main/LICENSE)
[![](https://badgen.net/github/status/domrally/peekeasy?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/peekeasy/actions)

tools for event proxies in typescript

## how to use

### sending events
```ts
const listener = () => console.log('sending')

const { send, sent } = new Sender<typeof listener>() // const listeners = new Set()
sent.add(listener) // listeners.add(listener)
send() // listeners.forEach(t => t())

```

### holding state
```ts
const actor = { act: () => console.log('holding') }

const { hold, held } = new Holder<typeof actor>() // const holder = { held: null }
hold(actor) // holder.held = actor
held.act() // holder.held.act()

```

## what to import

### web
```js
import { Holder, Sender } from 'https://cdn.skypack.dev/peekeasy?min'
```

### node
```
npm i peekeasy
```
```js
import { Holder, Sender } from 'peekeasy'
```

### deno
```ts
import { Holder, Sender } from 'https://cdn.skypack.dev/peekeasy?dts'
```
