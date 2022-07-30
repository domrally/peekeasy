# Peekeasy

tools for observing proxies in typescript & web assembly

[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=181717&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/test?logo=github&labelColor=181717&style=for-the-badge&label=test)](https://github.com/domrally/peekeasy/actions/workflows/test.yml)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/publish?logo=github&labelColor=181717&style=for-the-badge)](https://github.com/domrally/peekeasy/actions/workflows/publish.yml)

## Contents

- [**Use**](#Use)
  - [install](#install)
  - [exports](#exports)
    - [event delegates](#event-delegates)
    - [references](#references)
    - [vectors](#vectors)
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
  - [dependencies](#dependencies)
    - [internal](#internal)
    - [external](#external)

## Use

### install

```
npm i peekeasy
```

### exports

#### delegates

```ts
import { Delegate } from 'peekeasy'

const { log } = console,
	delegate = new Delegate('Hello, world!')

// Hello, world!
delegate.add(log)
```

```mermaid
sequenceDiagram
    sender->Delegate: delegate('Hello, world!')
    activate Delegate
    Delegate->sender: [log].forEach(print => print('Hello, world!'))
    deactivate Delegate
```

#### events

```ts
import { Delegate, Event } from 'peekeasy'

const { log } = console,
	delegate = new Delegate()
event = new Event(delegate)

event.then(() => log('Hello, world!'))
// Hello, world!
delegate()
```

```mermaid
sequenceDiagram
    sender->Delegate: delegate()
    activate Delegate
    Delegate->Event: [() => log('Hello, world!')].forEach(action => action())
    deactivate Delegate
```

#### references

```ts
import { Reference } from 'peekeasy'

const object: [string] = []
const { log } = console,
	reference = new Reference(object)

object[0] = 'Hello, world!'
// Hello, world!
console.log(reference[0])
```

```mermaid
sequenceDiagram
    sender->Reference: console.log(reference[0])
    activate Reference
    Reference->object: console.log(['Hello, world!'][0])
    deactivate Reference
    activate object
    object->sender: console.log('Hello, world!')
    deactivate object
```

#### vectors

```ts
import { Vector } from 'peekeasy'

const data = [['Hello, '], ['world!']]
vector = new Vector(...data)

// Hello, world!
log(...vector[0])
```

```mermaid
sequenceDiagram
    sender->Vector~[string]~: log(...vector[0])
    activate Vector~[string]~
    Vector~[string]~->Vector~string~: log(...[['Hello, '][0], ['world!'][0]])
    deactivate Vector~[string]~
    activate Vector~string~
    Vector~string~->sender: log('Hello, ', 'world!')
    deactivate Vector~string~
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
      - [reference/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/reference)
      - [vector/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/vector)
      - [web-assembly/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/web-assembly)

### dependencies

#### internal

```mermaid
classDiagram
    direction LR
    PromiseLike <|.. Event
    PromiseLike <.. AsyncIterator
    IteratorResult <.. AsyncIterator
    Iterator -- AsyncIterator
    AsyncIterator <.. AsyncIterable
    Iterable -- AsyncIterable
    AsyncIterable <|.. Event
    IteratorResult <.. Iterator
    Iterator <.. Iterable
    Iterable <|.. Vector
    Delegate <.. Event
    Action <|.. Delegate
    Set~Action~ <|.. Delegate
    Action .. Set~Action~
    WeakSet~Action~ <|-- Set~Action~
    WeakSet~Action~ <|.. Event
    Action .. WeakSet~Action~
    Event <.. Reference
    class IteratorResult {
        done boolean
        value any
    }
    class AsyncIterable {
        Symbol.asyncIterator() AsyncIterator
    }
    class Iterable {
        Symbol.iterator() Iterator
    }
    class Iterator {
        next() IteratorResult
    }
    class AsyncIterator {
        next() PromiseLike~IteratorResult~
    }
    class PromiseLike {
        then() PromiseLike
    }
    class WeakSet {
        add() WeakSet
        delete() WeakSet
        has() boolean
    }
    class Set {
        size number
        clear() void
        forEach() void
    }
    class Action {
        apply(args: params) void
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

#### external

[![](https://img.shields.io/badge/-prettier-F7B93E?style=for-the-badge&labelColor=181717&logo=prettier)](https://prettier.io)
[![](https://img.shields.io/badge/-nodejs-339933?style=for-the-badge&labelColor=181717&logo=node.js)](https://nodejs.org)
[![](https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&labelColor=181717&logo=typescript)](https://www.typescriptlang.org)
[![](https://img.shields.io/badge/-tsnode-3178C6?style=for-the-badge&labelColor=181717&logo=ts-node)](https://typestrong.org/ts-node)
[![](https://img.shields.io/badge/-eslint-4B32C3?style=for-the-badge&labelColor=181717&logo=ESLint)](https://eslint.org)
[![](https://img.shields.io/badge/-json-000000?style=for-the-badge&labelColor=181717&logo=json)](https://www.json.org/json-en.html)
