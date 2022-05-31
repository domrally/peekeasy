import { Events } from './events/events'
// import { Enums } from './enums/enums'
import { States } from './states/states'

export default {
	// Enums,
	Events,
	States,
}

// export const PeekeasyEnum = Enums.Enum
export const PeekeasyEvent = Events.Event
export const PeekeasyState = States.State
export const PeekeasyWeakEvent = Events.WeakEvent
export const PeekeasyWeakState = States.WeakState
