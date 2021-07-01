export class Transitions<S, T extends number | string> extends Map<string, Map<S, S>> {
	constructor(triggers: { [index: number]: [S, S][] }) {
		super()
		for (const trigger in triggers) {
			if (Object.prototype.hasOwnProperty.call(triggers, trigger)) {
				const transitions: [S, S][] = triggers[trigger]
				const map = new Map<S, S>()
				this.set(trigger.toString(), map)
				transitions.forEach(transition => {
					map.set(...transition)
				})
			}
		}
	}
}