export async function Wasm<T>(path: `${string}.wasm`) {
	// 
	const wasm = fetch(path),
		obj = await WebAssembly.instantiateStreaming(wasm),
		exports = obj.instance.exports as unknown as Exports,
		getOffset = (key: string) => exports[key](),
		getLength = (key: string) => exports[key + 'Length'](),
		memory = exports.memory,
		get = (_: T, key: string) => () => parse(memory, getOffset(key), getLength(key))

	// 
	return new Proxy({}, {get}) as T
}
export default Wasm

// wasm functions should return 
// a byte offset and length into the memory
// where the json is stored as a string
function parse(
	arrayBuffer: ArrayBufferLike, 
	byteOffset: number, 
	byteLength: number
) {
	// https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly
	// 
	const stringBuffer = new Uint8Array(arrayBuffer, byteOffset, byteLength)

	// create a string from this buffer
	let str = ''
	for (let i = 0; i < stringBuffer.length; i++) {
		str += String.fromCharCode(stringBuffer[i])
	}

	// 
	return JSON.parse(str)
}

type Exports = {memory: ArrayBufferLike} & {[key: string]: () => number}
