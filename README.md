# mealtime
[![](https://img.shields.io/github/license/domrally/mealtime)](#) [![](https://img.shields.io/snyk/vulnerabilities/github/domrally/mealtime)](#) [![](https://img.shields.io/github/package-json/v/domrally/mealtime)](#) [![](https://img.shields.io/github/repo-size/domrally/mealtime)](#) [![](https://img.shields.io/bundlephobia/min/mealtime)](#) [![Node.js Package](https://github.com/domrally/mealtime/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/domrally/mealtime/actions/workflows/npm-publish.yml)

a (loose) simulation of a Mealy machine in typescript using async generators and proxies

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
<script type="module" src="https://domrally.github.io/mealtime/src/main.js"></script>
```
or
```html
<script type="module">
    import { State, CreateStateProxy } from 'https://domrally.github.io/mealtime/src/main.js'	
    // then use inline
</script>
```

## use
```typescript
import { State, CreateStateProxy } from 'mealtime'

enum Triggers {
    Hello,
    World
}

interface S extends State<S, Triggers> { }

class Started extends State<S, Triggers> implements S {
    onEnter() {
        this.trigger(Triggers.Hello)
    }
    onExit() {
        console.log('Hello, ')
    }
}

class Stopped extends State<S, Triggers> implements S {
    onEnter() {
        console.log('World!')
    }
    onExit() { }
}

const started = new Started(),
    stopped = new Stopped()
    
const currentStateProxy = CreateStateProxy<S, Triggers>(started, {
    [Triggers.Hello]: [
        [started, stopped]
    ],
    [Triggers.World]: [
        [stopped, started]
    ]
})

currentStateProxy.onEnter()
```

## design

### abstract machines
The [state pattern](https://en.wikipedia.org/wiki/State_pattern) is a simulation of a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine#Transducers). With the addition of the [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) on the current state it becomes a simulation of a more powerful form of state machine:

#### [Mealy machines](https://en.wikipedia.org/wiki/Mealy_machine)
> In the theory of computation, 
> a Mealy machine is a finite-state machine 
> whose output values are determined both by 
> its current state and the current inputs


### javascript & typescript
Javascript has built in support for the [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern) through its [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) class. The addition of [typescript](https://www.typescriptlang.org/) allows us to implement a classic [state pattern](https://en.wikipedia.org/wiki/State_pattern) to hide behind the proxy


### patterns
The **state** and **proxy** patterns 
are three of twenty-three design patterns documented 
by the gang of four

#### [state pattern](https://en.wikipedia.org/wiki/State_pattern)
> allows an object to alter its behavior 
> when its internal state changes.
> This pattern is close to
> the concept of finite-state machines

#### [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern)
> In short, a proxy is a wrapper or agent object 
> that is being called by the client 
> to access the real serving object behind the scenes.
> Use of the proxy can simply be forwarding to the real object
> or can provide additional logic
