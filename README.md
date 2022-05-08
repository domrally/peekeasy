# Peekeasy

tools for observing proxies in typescript

[![](https://img.shields.io/badge/-svelte-FF3E00?style=for-the-badge&labelColor=grey&logo=svelte)](https://svelte.dev)
[![](https://img.shields.io/npm/v/peekeasy?style=for-the-badge&labelColor=grey&logo=npm&label=)](https://www.npmjs.com/package/peekeasy)
[![](https://img.shields.io/badge/-prettier-F7B93E?style=for-the-badge&labelColor=grey&logo=prettier)](https://prettier.io)
[![](https://img.shields.io/badge/-nodejs-339933?style=for-the-badge&labelColor=grey&logo=node.js)](https://nodejs.org)
[![](https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&labelColor=grey&logo=typescript)](https://www.typescriptlang.org)
[![](https://img.shields.io/badge/-tsnode-3178C6?style=for-the-badge&labelColor=grey&logo=ts-node)](https://typestrong.org/ts-node)
[![](https://img.shields.io/badge/-vite-646CFF?style=for-the-badge&labelColor=grey&logo=vite)](https://vitejs.dev)
[![](https://img.shields.io/badge/-eslint-4B32C3?style=for-the-badge&labelColor=grey&logo=ESLint)](https://eslint.org)
[![](https://img.shields.io/badge/-json-000000?style=for-the-badge&labelColor=grey&logo=json)](https://www.json.org/json-en.html)

## Getting Started

```ts
npm i peekeasy
```

## Using

```ts
import { Caller } from 'peekeasy'

const { call, callbacks } = new Caller(),
	log = () => console.log('calling')

callbacks.has(log) // false
callbacks.add(log)
call() // calling
```

## Folders

```
docs/
├── index.html
╰── assets╱

code/
├── exports.ts
├── index.html
├── exports/
│   ╰── caller.ts
╰── index/
    ├── index.css
    ├── index.svelte
    ├── assets╱
    ├── components╱
    ├── data╱
    ╰── environments╱

test/
├── integration.ts
├── unit.ts
├── integration╱
╰── unit╱
```
