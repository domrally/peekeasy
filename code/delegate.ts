import { DelegationHandler } from './delegation-handler.js'

export function Delegate<D extends {}>( delegate: D ) {	
	const handler = new DelegationHandler( delegate )
	
	const proxy = new Proxy<D>( delegate, handler )
	
	return function ( d?: D ) {
		handler.delegate = d ?? delegate

		return proxy
	}
}
