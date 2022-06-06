# Peekeasy

tools for observing proxies in typescript & web assembly

[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=grey&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/badge/-prettier-F7B93E?style=for-the-badge&labelColor=grey&logo=prettier)](https://prettier.io)
[![](https://img.shields.io/badge/-nodejs-339933?style=for-the-badge&labelColor=grey&logo=node.js)](https://nodejs.org)
[![](https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&labelColor=grey&logo=typescript)](https://www.typescriptlang.org)
[![](https://img.shields.io/badge/-tsnode-3178C6?style=for-the-badge&labelColor=grey&logo=ts-node)](https://typestrong.org/ts-node)
[![](https://img.shields.io/badge/-eslint-4B32C3?style=for-the-badge&labelColor=grey&logo=ESLint)](https://eslint.org)
[![](https://img.shields.io/badge/-json-000000?style=for-the-badge&labelColor=grey&logo=json)](https://www.json.org/json-en.html)

## Contents

- [**Use**](#Use)
  - [install](#install)
  - [import](#import)
  - [example](#example)
- [**Contribute**](#Contribute)
  - [goals](#goals)
  - [non-goals](#non-goals)
  - [clone repo](#clone-repo)
  - [open directory](#open-directory)
  - [download dependencies](#download-dependencies)
  - [run tests](#run-tests)
  - [build docs](#build-docs)
  - [deploy](#deploy)
- [**Project**](#Project)
  - [documentation](#documentation)
  - [structure](#structure)

## Use

### install

```
npm i peekeasy
```

### import

```ts
import Peekeasy from 'peekeasy'
```

### example

_[fizz-buzz.ts](https://github.com/domrally/peekeasy/blob/wasm/src/tests/integration/fizz-buzz.ts):_

```ts
// states must implement WeakEvent<[]>
class FizzBuzzState extends Peekeasy.WeakEvent<[]> {
	constructor(
		public word?: string,
		private index?: number,
		// in order to activate this state need to create an event
		private claimState = new Peekeasy.Event<[]>()
	) {
		super(claimState)
	}

	// functions must not be methods
	count = (count: number) => {
		if (!this.index) this.word = `${count}`

		// activate state if the count is divisible by the index
		if (!(this.index && count % this.index)) this.claimState()
	}
}

// pass all legal states to the state pattern
const fizzbuzz = Peekeasy.State(
	new FizzBuzzState(),
	new FizzBuzzState('fizz', 3),
	new FizzBuzzState('buzz', 5),
	new FizzBuzzState('fizzbuzz', 15)
)

for (let i = 1; i <= 100; i++) {
	// called on all states
	fizzbuzz.count(i)

	// return values always come from the current state
	console.log(fizzbuzz.word)
}
```

## Contribute

### goals

- syntactic sugar for:
  - state pattern
  - web assembly instancing
- bring concepts to typescript from:
  - _C#_ [`delegates`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/) and [`events`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/events/)
  - [array programming](https://en.wikipedia.org/wiki/Array_programming)
- use built-in _javascript_ types
  - [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) interfaces
  - [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) and [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects

### non-goals

- event framework
- state machine framework
- observer pattern

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
    - [events/](https://github.com/domrally/peekeasy/tree/main/src/exports/events)
    - [states/](https://github.com/domrally/peekeasy/tree/main/src/exports/states)
    - [wasms/](https://github.com/domrally/peekeasy/tree/main/src/exports/wasms)
  - [tests/](https://github.com/domrally/peekeasy/tree/main/src/tests)
    - [integration/](https://github.com/domrally/peekeasy/tree/main/src/tests/integration)
    - [unit/](https://github.com/domrally/peekeasy/tree/main/src/tests/unit)
