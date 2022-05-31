export default EnumValue
export type EnumValue<S extends string> = symbol & {description: S}
export function EnumValue<a extends string, S extends symbol>(symbol: S) {
	if (symbol.description) {
		const tha = symbol.description as unknown as a
		return { [tha]: symbol }
	}
}
	