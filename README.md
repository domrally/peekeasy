# Peekeasy

tools for observing proxies in typescript & web assembly

[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=181717&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/test?logo=github&labelColor=181717&style=for-the-badge&label=test)](https://github.com/domrally/peekeasy/actions/workflows/test.yml)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/publish?logo=github&labelColor=181717&style=for-the-badge)](https://github.com/domrally/peekeasy/actions/workflows/publish.yml)

## Contents

- [**Use**](#Use)
  - [install](#install)
  - [exports](#exports)
    - [delegates](#delegates)
    - [events](#events)
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
    Delegate->Set: [log].forEach(print => print('Hello, world!'))
    activate Set
    Set->Delegate: log('Hello, world!')
    deactivate Set
```

#### events

```ts
import { Delegate, Event } from 'peekeasy'

const { log } = console,
	delegate = new Delegate(),
	event = new Event(delegate)

event.then(() => log('Hello, world!'))

// Hello, world!
delegate()
```

```mermaid
sequenceDiagram
    Delegate->Set: [() => log('Hello, world!')].forEach(f => f())
    activate Set
    Set->Event: log('Hello, world!')
    deactivate Set
```

#### references

```ts
import { Reference } from 'peekeasy'

const { log } = console,
	object: [string] = [],
	reference = new Reference(object)

object[0] = 'Hello, world!'

// Hello, world!
log(reference[0])
```

```mermaid
sequenceDiagram
    Reference->object: log(['Hello, world!'][0])
    activate object
    object->Reference: log('Hello, world!')
    deactivate object
```

#### vectors

```ts
import { Vector } from 'peekeasy'

const { log } = console,
	data = [['Hello, '], ['world!']],
	vector = new Vector(...data)

// Hello, world!
log(...vector[0])
```

```mermaid
sequenceDiagram
    Vector->Array: log(...[['Hello, '][0], ['world!'][0]])
    activate Array
    Array->Vector: log('Hello, ', 'world!')
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
      - [reference/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/reference)
      - [vector/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/vector)
      - [web-assembly/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/web-assembly)

### dependencies

#### internal

```mermaid
classDiagram
    direction LR
    PromiseLike <|.. Promise
    PromiseLike *-- Event
	 Promise *-- WebAssembly
    Promise <.. Event
    PromiseLike <.. AsyncIterator
    IteratorResult o-- AsyncIterator
    Iterator -- AsyncIterator
    AsyncIterator *-- AsyncIterable
    Iterable -- AsyncIterable
    AsyncIterable *-- Event
    IteratorResult o-- Iterator
    Iterator *-- Iterable
    Iterable <|.. Set~Action~
    Delegate *-- Event
    Action <.. Event
    Set~Action~ *-- Delegate
    Action *-- Delegate
    WeakSet~Action~ -- Set~Action~
    WeakSet~Action~ <|.. Event
    Event <-- Reference
    Iterable *-- Vector
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
