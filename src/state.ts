// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.
type Constructor = new (...args: any[]) => {};
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
export function createState<TBase extends Constructor>(Base: TBase) {
	let _promise: any
	let _resolve: any
	const thing = async () => {
		while (true) {
			_promise = new Promise(r => _resolve = r)
			await _promise
		}
	}
	thing()

	return class Stating extends Base {
		get resolve(): (c: TBase) => void {
			return _resolve
		}
		get promise(): PromiseLike<TBase> {
			return _promise
		}
	}
}
