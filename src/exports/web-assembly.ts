export interface Webassembly<T> extends Promise<T> {}
/**
 * Creates and manages a state pattern based on an initial set of possible states
 * @param path state of the returned object
 * @returns a typed object isomorphic to the wasm module exports
 */
export class Webassembly<T> extends Promise<T> {
	constructor(path: `${string}.wasm`) {
		super(async resolve => {
			//
			const wasm = fetch(path),
				obj = await WebAssembly.instantiateStreaming(wasm),
				exports = obj.instance.exports as unknown as Exports,
				getOffset = (key: string) => exports[key](),
				getLength = (key: string) => exports[key + 'Length'](),
				memory = exports.memory,
				get = (_: T, key: string) => () =>
					parse(memory, getOffset(key), getLength(key))

			resolve(new Proxy({}, { get }) as T)
		})
	}
}

/**
 * wasm functions should return a byte offset and length into the memory where the json is stored as a string
 * https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly
 * @param arrayBuffer memory buffer of the wasm module
 * @param byteOffset offset of the json string in the memory buffer
 * @param byteLength	length of the json string in the memory buffer
 * @returns an object parsed from the json string located in the memory buffer
 */
function parse(
	arrayBuffer: ArrayBufferLike,
	byteOffset: number,
	byteLength: number
) {
	// access memory
	const stringBuffer = new Uint8Array(arrayBuffer, byteOffset, byteLength)

	// create a string from this buffer
	let str = ''
	for (let i = 0; i < stringBuffer.length; i++) {
		str += String.fromCharCode(stringBuffer[i])
	}

	return JSON.parse(str)
}

type Exports = { memory: ArrayBufferLike } & { [key: string]: () => number }
