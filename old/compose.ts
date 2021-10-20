import { Eventable, Events } from './events.js'
import { state } from './state.js'

export function compose<S, T extends Eventable>(Base: Input<S, T>): Output<S, T>
export function compose<S, T extends Eventable, TBase extends Constructable<T>>(Base: TBase) {
	return class _ extends Base implements AsyncIterable<Events<T>> {
		async *[Symbol.asyncIterator]() {
			yield* this.state
		}
	}
}
type Constructable<T extends Eventable> = new (...args: any[]) => { state: state<T> }
type Input<S, T extends Eventable> = new (...args: any[]) => S & { state: state<T>, onEnter?(): void, onExit?(): void }
type Output<S, T extends Eventable> = new (...args: any[]) => S & AsyncIterable<Events<T>>