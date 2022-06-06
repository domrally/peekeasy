import { Delegate } from './events/delegate'
import { Event } from './events/event'
import { instantiateWebAssembly } from './wasms/instantiate-web-assembly'
import { vectorize } from './states/vectorize'

export { Delegate, Event, instantiateWebAssembly, vectorize }

export default {
	Delegate,
	Event,
	instantiateWebAssembly,
	vectorize,
}
