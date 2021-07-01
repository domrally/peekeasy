// 
const toString = (ms: number) => {
	let cs = ms / 10
	let ss = cs / 100
	let mn = ss / 60
	mn = Math.floor(mn)

	ss -= mn * 60
	ss = Math.floor(ss)

	cs -= mn * 60 * 100
	cs -= ss * 100
	cs = Math.round(cs)

	const pad = (fullNumber: number, target = 2) => {
		const last2Digits = fullNumber.toString().slice(-target)
		return last2Digits.padStart(target, '0')
	}

	return `${pad(mn)}:${pad(ss)}:${pad(cs)}`
}
export class Timer {
	#resolveTotal = (_value: number) => { }
	#resolveLap = (_value: number) => { }
	#total = 0
	#lap = 0
	set total(value: number) {
		this.#total = value
		this.#resolveTotal(value)
	}
	get total() {
		return this.#total
	}
	set lap(value: number) {
		this.#lap = value
		this.#resolveLap(value)
	}
	get lap() {
		return this.#lap
	}
	async * totaller(): AsyncIterator<string> {
		yield 'Press Me'
		while (true) {
			const total = await new Promise<number>(resolve => this.#resolveTotal = resolve)
			yield toString(total)
		}
	}
	async * lapper(): AsyncIterator<string> {
		yield 'Split Me'
		while (true) {
			const lap = await new Promise<number>(resolve => this.#resolveLap = resolve)
			yield toString(lap)
		}
	}
}