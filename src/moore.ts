//
export class Moore<S extends AsyncIterable<S>> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await Promise.race(this.states) as S
		}
	}
	// 
	constructor(private states: S[]) { }
}
