import { DelegationHandler } from './delegation-handler.js'

export function Delegate< D extends {} >( initial?: D ) {	
	const handler = new DelegationHandler( initial )
	
	const proxy = new Proxy< D >( initial ?? {} as any, handler )
	
	return function ( delegate?: D ) {
		handler.delegate = delegate ?? initial

		return proxy
	}
}
