import { EnumValue } from './enum-value'

export default Enum
export function Enum<S extends [string, symbol][]>(...symbols: S) {
	const record = {}
	for (const symbol in symbols) {
		// record[symbol.description] = symbol as unknown as symbol
	}
	return record
}
