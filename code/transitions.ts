export const mapTransitions = <S extends object, T extends symbol>(
	record2transitions: Record<T, readonly [S, S][]>
) => {
	//
	const keys = Object.getOwnPropertySymbols(record2transitions)

	const record2map = {} as Record<T, WeakMap<S, S>>
	const triggerer = (trigger: symbol) => {
		const map = new WeakMap<S, S>()
		record2map[trigger as T] = map

		const mapper = (transition: [S, S]) => map.set(...transition)
		record2transitions[trigger as T].forEach(mapper)
	}
	keys.forEach(triggerer)

	return record2map
}
