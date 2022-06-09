import { Event } from './event'

export type Enum<Type extends {[key: PropertyKey]: symbol}> = {
	[Key in keyof Type as `${Type[Key]['description']}`]: Type[Key]
}


export const Enum = {} as new <Type extends {[key: PropertyKey]: symbol}>(symbols: Type) => Enum<Type>
Enum.constructor = <Type extends {[key: PropertyKey]: symbol}>(symbols: Type) => {
	return {}
}


const a = Symbol('a'),
 b = Symbol('b')
export const things = new Enum({a, b})
