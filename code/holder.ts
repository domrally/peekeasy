export class Holder<T extends {}> implements ProxyHandler<T> {
	readonly held: T = new Proxy<any>(() => {}, this)
	
	readonly hold = (target: T) => this.#target = target

	readonly get = (_: T, key: Key) => this.#target[key]
	
	readonly set = <V>(_: T, key: Key, value: V) => this.#target[key] = value
	
	readonly apply = (_: T, that: T, args: any) => this.#target.apply(that, args)
	
	#target: any	
}

type Key = string | number | symbol
