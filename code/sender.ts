import { PeekSet } from './peek-set.js'

export class Sender<T extends () => void> extends Set<T> implements ProxyHandler<T> {
	readonly send: T = new Proxy<any>(() => { }, this)
	
	readonly sent: WeakSet<T> = new PeekSet(this)
	
	set <V>(_: T, key: Key, value: V) {
		const set = (t: any) => t[key] = value
		
		this.forEach(set)
		
		return true
	}
	
	apply (_: T, that: T, args: any) {
		const apply = (t: any) => t.apply(that, args)
		
		this.forEach(apply)
	}
}

type Key = string | number | symbol
