# Peekeasy

tools for observing proxies in typescript & web assembly

[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=181717&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/test?logo=github&labelColor=181717&style=for-the-badge&label=test)](https://github.com/domrally/peekeasy/actions/workflows/test.yml)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/publish?logo=github&labelColor=181717&style=for-the-badge)](https://github.com/domrally/peekeasy/actions/workflows/publish.yml)

## Contents

- [**Use**](#Use)
  - [install](#install)
  - [import](#import)
  - [example](#example)
- [**Contribute**](#Contribute)
  - [clone repo](#clone-repo)
  - [open directory](#open-directory)
  - [download dependencies](#download-dependencies)
  - [fix and format](#fix-and-format)
  - [run tests](#run-tests)
  - [build docs](#build-docs)
  - [deploy](#deploy)
- [**Project**](#Project)
  - [goals](#goals)
  - [non-goals](#non-goals)
  - [documentation](#documentation)
  - [structure](#structure)

## Use

### install

```
npm i peekeasy
```

### exports

#### event delegates

```ts
import { Delegate, Event } from 'peekeasy'

const delegate = new Delegate('Hello, world!'),
   event = new Event(delegate)

// Hello, world!
event.then(console.log)
```

```mermaid
sequenceDiagram
    Action->Event: event.then(action)
    activate Event
    Event->Delegate: new Promise(delegate.add)
    deactivate Event
    activate Delegate
    Delegate->Set: new Promise(set.add)
    deactivate Delegate
    activate Set
    Set->Action: set.forEach(action => action())
    deactivate Set
```

#### reference

```ts
import { Reference } from 'peekeasy'

const vector = new Reference(() => console.log('Hello, world!'))

// Hello, world!
vector()
```

```mermaid
sequenceDiagram
    Action->Reference: new Reference(action)
    activate Reference
    Reference->Array: reference()
    deactivate Reference
    activate Array
    Array->Action: ([action] = array)()
    deactivate Array
```

#### vector

```ts
import { Vector } from 'peekeasy'

const vector = new Vector(
   () => console.log('Hello,'),
   () => console.log('   world!')
)

// Hello,
//    world!
vector()
```

```mermaid
sequenceDiagram
    Action->Vector: new Vector(...actions)
    activate Vector
    Vector->Array: vector()
    deactivate Vector
    activate Array
    Array->Action: actions.map(action => action())
    deactivate Array
```

## Contribute

### clone repo

```
gh repo clone domrally/peekeasy
```

### open directory

```
cd Documents/Github/peekeasy
```

### download dependencies

```
npm i
```

### fix and format

```
npm stop
```

### run tests

```
npm test
```

### build docs

```
npm start
```

### deploy

merge a [pull request](https://github.com/domrally/peekeasy/compare) into `main` to publish to **npm**

## Project

### goals

- syntactic sugar in typescript for
  - [state pattern](https://en.wikipedia.org/wiki/State_pattern)
  - [streaming web assembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming) [exported functions](https://developer.mozilla.org/en-US/docs/WebAssembly/Exported_functions)
- implementations for built-in javascript types
  - [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) interfaces
  - `Iterable`, `Iterator`, `IterableIterator`, and `IteratorReturnResult`
  - [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) and [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects
- bring concepts to typescript from
  - C# [`delegates`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/) and [`events`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/events/)
  - [array programming](https://en.wikipedia.org/wiki/Array_programming)

### non-goals

- an event system
- an app framework
- web-assembly build tools
- a state machine framework
- an implementation of an observer pattern

### documentation

https://domrally.github.io/peekeasy

### structure

- [.github/](https://github.com/domrally/peekeasy/tree/main/.github)
  - [workflows/](https://github.com/domrally/peekeasy/tree/main/.github/workflows)
- [docs/](https://github.com/domrally/peekeasy/tree/main/docs)
  - [assets/](https://github.com/domrally/peekeasy/tree/main/docs/assets)
  - [classes/](https://github.com/domrally/peekeasy/tree/main/docs/classes)
  - [modules/](https://github.com/domrally/peekeasy/tree/main/docs/modules)
- [src/](https://github.com/domrally/peekeasy/tree/main/src)
  - [exports/](https://github.com/domrally/peekeasy/tree/main/src/exports)
  - [tests/](https://github.com/domrally/peekeasy/tree/main/src/tests)
    - [integration/](https://github.com/domrally/peekeasy/tree/main/src/tests/integration)
    - [unit/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit)
      - [delegate/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/delegate)
      - [event/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/event)
      - [iterable-iterator/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/iterable-iterator)
      - [iterator-result-value/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/iterator-result-value)
      - [vector/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/vector)
      - [web-assembly/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/web-assembly)

### classes

```mermaid
classDiagram
    direction LR
    Iterable <|.. Vector
    Iterable <|-- AsyncIterable
    Iterator <|-- AsyncIterator
    AsyncIterable <|.. Event
    PromiseLike <|.. Event
    WeakSet~Action~ <|.. Event
    Action <.. WeakSet~Action~
    Action <.. Set~Action~
    Action <|.. Delegate
    Set~Action~ <|.. Delegate
    Delegate <.. Event
    Event <.. Reference
    class AsyncIterable {
        asyncIterator() AsyncIterator
    }
    class Iterable {
        iterator() Iterator
    }
    class Delegate {

        apply() void
    }
    link Delegate "https://github.com/domrally/peekeasy/blob/main/src/delegate.ts" "delegate.ts"
    class Event
    link Event "https://github.com/domrally/peekeasy/blob/main/src/event.ts" "event.ts"
    class Vector
    link Vector "https://github.com/domrally/peekeasy/blob/main/src/vector.ts" "vector.ts"
```

### dependencies

[![](https://img.shields.io/badge/-prettier-F7B93E?style=for-the-badge&labelColor=181717&logo=prettier)](https://prettier.io)
[![](https://img.shields.io/badge/-nodejs-339933?style=for-the-badge&labelColor=181717&logo=node.js)](https://nodejs.org)
[![](https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&labelColor=181717&logo=typescript)](https://www.typescriptlang.org)
[![](https://img.shields.io/badge/-tsnode-3178C6?style=for-the-badge&labelColor=181717&logo=ts-node)](https://typestrong.org/ts-node)
[![](https://img.shields.io/badge/-eslint-4B32C3?style=for-the-badge&labelColor=181717&logo=ESLint)](https://eslint.org)
[![](https://img.shields.io/badge/-json-000000?style=for-the-badge&labelColor=181717&logo=json)](https://www.json.org/json-en.html)
