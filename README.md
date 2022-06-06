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

- [Use](#Use)
  - [install](#install)
  - [import](#import)
- [Contribute](#Contribute)
  - [get started](#get%20started)
  - [run](#run)
  - [deploy](#deploy)
- [Project](#Project)
  - [folders](#folders)

## Use

### install

```ts
npm i peekeasy
```

### import

```ts
import Peekeasy from 'peekeasy'

interface FizzBuzz {
	count(count: number): void
	word?: string
}

class FizzBuzzState extends Peekeasy.WeakEvent<[]> implements FizzBuzz {
	constructor(
		private index?: number,
		public word?: string,
		private claimState = new Peekeasy.Event<[]>()
	) {
		super(claimState)
	}

	count = (count: number) => {
		if (!this.index) {
			this.word = count.toString()
		}

		if (!(this.index && count % this.index)) {
			this.claimState()
		}
	}
}

const fizzbuzz: FizzBuzz = Peekeasy.State(
	new FizzBuzzState(),
	new FizzBuzzState(3, 'fizz'),
	new FizzBuzzState(5, 'buzz'),
	new FizzBuzzState(15, 'fizzbuzz')
)

for (let i = 0; i < 100; i++) {
	fizzbuzz.count(i)

	console.log(fizzbuzz.word)
}
```

## Contribute

### get started

```sh
gh repo clone domrally/skene
```

```sh
cd Documents/Github/skene
```

```sh
npm i
```

### run

```sh
npm test
```

```sh
npm start
```

### deploy

merge a [pull request](https://github.com/domrally/peekeasy/compare) into `main` to publish to npm

## Docs

### folders

- .github/
  - workflows/
- docs/
  - assets/
- src/
  - exports/
    - events/
    - states/
    - wasms/
  - pages/
    - assets/
    - components/
  - tests/
    - integration/
    - unit/
