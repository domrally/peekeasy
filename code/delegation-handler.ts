export class DelegationHandler<S extends {}> implements ProxyHandler<S>  {
	get( _: S, key: string | symbol | number ) {
		return this.delegate[key]
	}
	
	set<V>( _: S, key: string | symbol | number, value: V ) {
		this.delegate[ key ] = value
		
		return true
	}
	
	apply( _: S, that: any, args: any ) {
		const bound = this.delegate.bind( that )
		
		return bound( ...args )
	}
	
	constructor( public delegate: any ) {}
}