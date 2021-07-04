export interface IState<S, T> extends AsyncIterable<[S, T]> {
	[Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>;
	onEnter?(): void;
	onExit?(): void;
}
export declare abstract class State<S, T> implements IState<S, T> {
	[Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>;
	protected trigger(trigger: T): void;
}
