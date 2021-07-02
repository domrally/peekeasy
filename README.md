# mealy
a (loose) simulation of a Mealy machine in Typescript using async generators and proxies

## installation

## use
```typescript
import { State, CreateStateProxy } from 'mealy'

abstract class Example extends State<Example> { }
let stateA, stateB, stateC, stateD: Example
enum Triggers {
    Event0,
    Event1
}
const currentStateProxy = CreateStateProxy<Example, Triggers>(initialState, {
    [Triggers.Event0]: [
        [stateA, stateB],
        [stateB, stateA],
        [stateD, stateC]
    ],
    [Triggers.Event1]: [
        [stateA, stateC]
    ]
})
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
