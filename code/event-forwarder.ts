import { WeakSetWrapper } from './weak-set-wrapper.js'

export class EventForwarder<T extends {}> extends Set<T> implements ProxyHandler<T> {
	constructor(public caller: T) {
		super()

		this.caller = new Proxy(caller, this)
	}

	listeners: WeakSet<T> = new WeakSetWrapper(this)
	
	get(target: any, key: string | symbol | number) {
		let item: any

		if (this.size) {
			this.forEach((t: any) => item = t[key])
		} else {
			item = target[key]
		}

		return item
	}
	
	set<V>(target: any, key: string | symbol | number, value: V) {
		if (this.size) {
			this.forEach((t: any) => t[key] = value)
		} else {
			target[key] = value
		}
		
		return true
	}
	
	apply(target: any, that: any, args: any) {
		let item: any

		if (this.size) {
			this.forEach((t: any) => item = t.bind(that)(...args))
		} else {
			item = target.bind(that)(...args)
		}

		return item
	}
}
