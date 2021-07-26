# mealtime
[![](https://badgen.net/badge/license/MIT/blue)](#) [![](https://badgen.net/npm/types/tslib?icon=typescript&label=)](#) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label)](#) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=lines&color=green)](#) [![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=green)](#) [![](https://github.com/domrally/mealtime/actions/workflows/build.yml/badge.svg)](https://github.com/domrally/mealtime/actions/workflows/build.yml) 

proxy state pattern made in typescript

## installation
```bash
> npm i mealtime
```
or 
```bash
> yarn add mealtime
```
or 
```html
<script type="module" src="unpkg.com/mealtime"></script>
```

## how to use

### importing
```typescript
import { compose, proxy, state } from 'mealtime'
```
or
```typescript
const path = 'https://unpkg.com/mealtime'
const { compose, proxy, state } = await import(path)
```
or
```html
<script type="module">
    import { compose, proxy, state } from 'https://unpkg.com/mealtime'	
</script>
```
### triggers
```typescript
const Hello    = Symbol('Hello'),
      World    = Symbol('World'),
      Triggers = Object.freeze({
          Hello,
          World
      } as const)
type Triggers = typeof Triggers
```
### state composition
```typescript
interface Example {
    name    : string
    toggle(): void
}
```
```typescript
const Start = compose(class _ {
    constructor(public state: state<Triggers>) { }
    name   = 'Start'
    toggle = () => this.state.trigger(Triggers.Hello)
})
```
```typescript
const End = compose(class _ {
    constructor(public state: state<Triggers>) { }
    name   = 'End'
    toggle = () => this.state.trigger(Triggers.World)
})
```
### transitions & proxy
```typescript
const s       = state(),
      start   = new Start(s),
      end     = new End(s),
      machine = proxy<Example, Triggers>(start, {
          [Triggers.Hello]: [
              [start, end]
          ],
          [Triggers.World]: [
              [end, start]
          ]
      })
```
### interaction
```typescript
const loop = async () => {
    console.log(`input state: ${machine.name}`)
    for await (const trigger of machine) {
        console.log(`trigger: ${trigger.toString()}`)
        console.log(`output state: ${machine.name}`)
        return
    }
}
loop()
machine.toggle()
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
