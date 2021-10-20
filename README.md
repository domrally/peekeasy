# mealtime
[![](https://badgen.net/badge/license/MIT/blue)](#) [![](https://badgen.net/npm/types/tslib?icon=typescript&label=)](#) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label)](#) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=lines&color=green)](#) [![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=green)](#) [![](https://github.com/domrally/mealtime/actions/workflows/build.yml/badge.svg)](https://github.com/domrally/mealtime/actions/workflows/build.yml) 

proxy state pattern made in typescript

## how to use
```typescript
async function loop() {
    const { proxy, observe, setTarget } = new Context()
    for await (const [key, value] of observe()) {
    }
}
```
## how to install & import
### javascript or deno
```js
import { Context } from 'https://esm.sh/mealtime'
```
```js
const path = 'https://esm.sh/mealtime'
const { Context } = await import(path)
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
<script type="module" src="esm.sh/mealtime"></script>
```
```html
<script type="module">
    import { Context } from 'https://esm.sh/mealtime'	
</script>
```

## design

### abstract machines
finite state machines are a common way to think about certain kinds of computation

[mealy machines](https://en.wikipedia.org/wiki/Mealy_machine) are powerful versions of an fsm
> in the theory of computation, a Mealy machine is a finite-state machine whose output values are determined both by its current state and the current inputs

### javascript & typescript
javascript has built in support for the [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern) 
> a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object or can provide additional logic.

typescript allows us to implement a classic [state pattern](https://en.wikipedia.org/wiki/state_pattern)
> allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines
