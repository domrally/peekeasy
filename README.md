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
the [state pattern](https://en.wikipedia.org/wiki/state_pattern) is a simulation of a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine#Transducers). With the addition of the [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) on the current state it becomes a simulation of a more powerful form of state machine:

#### [Mealy machines](https://en.wikipedia.org/wiki/Mealy_machine)
> in the theory of computation, 
> a Mealy machine is a finite-state machine 
> whose output values are determined both by 
> its current state and the current inputs


### typescript & javascript
javascript has built in support for the [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern) through its [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) class. The addition of [typescript](https://www.typescriptlang.org/) allows us to implement a classic [state pattern](https://en.wikipedia.org/wiki/state_pattern) to hide behind the proxy


### patterns
the **composition over inheritance** principle and the **proxy** and **state** patterns
are three patterns described in the influential book Design Patterns (1994)

#### [composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
> the principle that classes should achieve polymorphic behavior 
> and code reuse by their composition 
> (by containing instances of other classes that implement the desired functionality) 
> rather than inheritance from a base or parent class

#### [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern)
> a proxy is a wrapper or agent object 
> that is being called by the client 
> to access the real serving object behind the scenes.
> Use of the proxy can simply be forwarding to the real object
> or can provide additional logic

#### [state pattern](https://en.wikipedia.org/wiki/state_pattern)
> allows an object to alter its behavior 
> when its internal state changes.
> This pattern is close to
> the concept of finite-state machines
