# Peekeasy

delegated proxy tools in typescript

[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=181717&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/test?logo=github&labelColor=181717&style=for-the-badge&label=test)](https://github.com/domrally/peekeasy/actions/workflows/test.yml)
[![](https://img.shields.io/github/workflow/status/domrally/peekeasy/publish?logo=github&labelColor=181717&style=for-the-badge)](https://github.com/domrally/peekeasy/actions/workflows/publish.yml)

## Contents

- [**Use**](#Use)
  - [install](#install)
  - [exports](#exports)
    - [forward](#forward)
    - [delegate](#delegate)
    - [reference](#reference)
    - [vector](#vector)
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

#### forward

```ts
import { Forward } from 'peekeasy'

const { log } = console,
	forward = new Forward('Hello, world!')

// Hello, world!
forward.add(log)
```

```mermaid
sequenceDiagram
    Forward->Set: [log].forEach(print => print('Hello, world!'))
    activate Set
    Set->Forward: log('Hello, world!')
    deactivate Set
```

#### delegate

```ts
import { Delegate, Forward } from 'peekeasy'

const { log } = console,
	forward = new Forward(),
	delegate = new Delegate(forward)

delegate.then(() => log('Hello, world!'))

// Hello, world!
forward()
```

```mermaid
sequenceDiagram
    Forward->Set: [() => log('Hello, world!')].forEach(f => f())
    activate Set
    Set->Delegate: log('Hello, world!')
    deactivate Set
```

#### reference

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

#### vector

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
      - [forward/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/forward)
      - [delegate/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/delegate)
      - [reference/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/reference)
      - [vector/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit/vector)

### dependencies

#### internal

```mermaid
classDiagram
    direction LR
    PromiseLike <|.. Promise
    PromiseLike *-- Delegate
    Promise <.. Delegate
    PromiseLike <.. AsyncIterator
    IteratorResult o-- AsyncIterator
    Iterator -- AsyncIterator
    AsyncIterator *-- AsyncIterable
    Iterable -- AsyncIterable
    AsyncIterable *-- Delegate
    IteratorResult o-- Iterator
    Iterator *-- Iterable
    Forward *-- Delegate
    Action <.. Delegate
    Set~Action~ *-- Forward
    Action *-- Forward
    WeakSet~Action~ -- Set~Action~
    WeakSet~Action~ <|.. Delegate
    Delegate <-- Reference
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
    class Promise {
        finally(onfinally () => void) Promise
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
	 link Action "https://github.com/domrally/peekeasy/blob/main/src/action.ts" "action.ts"
    class Forward {
        apply() void
    }
    link Forward "https://github.com/domrally/peekeasy/blob/main/src/forward.ts" "forward.ts"
    class Delegate
    link Delegate "https://github.com/domrally/peekeasy/blob/main/src/delegate.ts" "delegate.ts"
    class Vector
    link Vector "https://github.com/domrally/peekeasy/blob/main/src/vector.ts" "vector.ts"
	 class Reference
	 link Reference "https://github.com/domrally/peekeasy/blob/main/src/reference.ts" "reference.ts"
```

#### external

[![](https://img.shields.io/badge/-prettier-F7B93E?style=for-the-badge&labelColor=181717&logo=prettier)](https://prettier.io)
[![](https://img.shields.io/badge/-nodejs-339933?style=for-the-badge&labelColor=181717&logo=node.js)](https://nodejs.org)
[![](https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&labelColor=181717&logo=typescript)](https://www.typescriptlang.org)
[![](https://img.shields.io/badge/-tsnode-3178C6?style=for-the-badge&labelColor=181717&logo=ts-node)](https://typestrong.org/ts-node)
[![](https://img.shields.io/badge/-eslint-4B32C3?style=for-the-badge&labelColor=181717&logo=ESLint)](https://eslint.org)
[![](https://img.shields.io/badge/-json-000000?style=for-the-badge&labelColor=181717&logo=json)](https://www.json.org/json-en.html)
