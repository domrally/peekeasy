import { State } from './state.js'

export function compose<S, T extends symbol>(Base: Input<S, T>): Output<S, T>
export function compose<S, T extends symbol, TBase extends Constructable<T>>(Base: TBase) {
	return class _ extends Base implements AsyncIterable<T> {
		async *[Symbol.asyncIterator]() {
			yield* this.state
		}
	}
}
type Constructable<T extends symbol> = new (...args: any[]) => { state: State<T> }
type Input<S, T extends symbol> = new (...args: any[]) => S & { state: State<T>, onEnter?(): void, onExit?(): void }
type Output<S, T extends symbol> = new (...args: any[]) => S & AsyncIterable<T>