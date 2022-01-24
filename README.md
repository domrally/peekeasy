# Peekeasy

tools for observing proxies in typescript

## how to use

#### sending events
```ts
const listener = () => console.log('calling listeners'),
    { call, callBacks } = new Caller<typeof listener>()
    
callBacks.add(listener)
call()

```

#### holding state
```ts
const actor = { act: () => console.log('proxy state') },
    { proxy, setProxy } = new Proxier<typeof actor>()
    
setProxy(actor)
proxy.log()

```

## what to import

#### web
```js
import { Caller, Proxier } from 'https://cdn.skypack.dev/peekeasy?min'
```

#### node
```
npm i peekeasy
```
```js
import { Caller, Proxier } from 'peekeasy'
```

#### deno
```ts
import { Caller, Proxier } from 'https://cdn.skypack.dev/peekeasy?dts'
```

<br>

![](https://img.shields.io/npm/v/mealtime?style=for-the-badge&label=version&logo=npm&color=CB3837) ![](https://img.shields.io/badge/docs-CC%20BY--ND%204.0-f8722a?logo=creativecommons&style=for-the-badge) ![](https://img.shields.io/badge/format-prettier-f8bc45?style=for-the-badge&logo=prettier) ![](https://img.shields.io/npm/l/mealtime?style=for-the-badge&color=3DA639&logo=opensourceinitiative) ![](https://img.shields.io/badge/lang-ts-3178c6?logo=typescript&style=for-the-badge) ![](https://img.shields.io/badge/lint-es-4B32C3?logo=eslint&style=for-the-badge&logoColor=4B32C3) ![](https://img.shields.io/badge/style-google-blueviolet?style=for-the-badge&logo=google&label=style&logoColor=blueviolet)
