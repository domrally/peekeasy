//
export class Moore<S extends AsyncIterable<S>> implements AsyncIterable<S> {
	get [Symbol.asyncIterator]() {
		this._lazyInit?.()
		return this._asyncIterator
	}
	// 
	constructor(private states: S[]) { }

	_setResult: (result: IteratorResult<S>) => void = () => { }
	_nextPromise: Promise<IteratorResult<S>> = new Promise(resolve => this._setResult = resolve)
	readonly _asyncIterator = () => {
		return {
			next: () => this._nextPromise
		}
	}
	_lazyInit: any = async () => {
		this._lazyInit = null
		while (true) {
			const value = await Promise.race(this.states) as S
			const setResult = this._setResult
			this._nextPromise = new Promise(resolve => this._setResult = resolve)
			setResult({ value, done: false })
		}
	}
}
