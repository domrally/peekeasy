# Peekeasy

![](https://img.shields.io/npm/v/mealtime?style=for-the-badge&label=version&logo=npm&color=CB3837) ![](https://img.shields.io/badge/docs-CC%20BY--ND%204.0-f8722a?logo=creativecommons&style=for-the-badge) ![](https://img.shields.io/badge/format-prettier-f8bc45?style=for-the-badge&logo=prettier) ![](https://img.shields.io/npm/l/mealtime?style=for-the-badge&color=3DA639&logo=opensourceinitiative) ![](https://img.shields.io/badge/lang-ts-3178c6?logo=typescript&style=for-the-badge) ![](https://img.shields.io/badge/lint-es-4B32C3?logo=eslint&style=for-the-badge&logoColor=4B32C3) ![](https://img.shields.io/badge/style-google-blueviolet?style=for-the-badge&logo=google&label=style&logoColor=blueviolet)

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
