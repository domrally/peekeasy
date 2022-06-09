import { Vector } from '../../../exports/exports'

class Outline extends Peekeasy.Event<[]> {
	constructor(
		private name: string,
		private enter = new Peekeasy.Delegate<[]>()
	) {
		super(enter)
	}
	value = {
		f: () => `${this.name}.a.x`,
	}
	set = (name: string) => {
		if (name !== this.name) return

		this.enter()
	}
}

const outlines = [new Outline('1st'), new Outline('2nd')]
const outlineVector: Vector<Outline> = Vector.create(outlines)

const { log } = console

// log(outlines[currentIndex].a.x)
const outlineState: State<Outline> = outlineVector(),
	valueState: State<Outline['value']> = outlineVector.value(),
	valueVector: Vector<Outline['value']> = outlineVector.value,
	fState: State<Outline['value']['f']> = outlineVector.a.f(),
	f: Outline['value']['f'] = await new State(outlines).value.f,
	f: Outline['value']['f'] = await fState
f: Outline['value']['f'] = await outlineVector.value

// log(outlines.map(o => o.a)[currentIndex].x)
log(outlineKeyVector.a().x) // 2nd.a.x
outlineKeyVector.set('1st')
log(outlineKeyVector.a().x) // 1st.a.x

// log(outlines.map(o => o.a.x)[currentIndex])
log(outlineKeyVector.a.x()) // 1st.a.x
outlineKeyVector.set('2nd')
log(outlineKeyVector.a.x()) // 2nd.a.x

// Undefined 	"undefined"
// Null 	"object"(see below)
// Boolean 	"boolean"
// Number 	"number"
// BigInt(new in ECMAScript 2020) 	"bigint"
// String 	"string"
// Symbol(new in ECMAScript 2015) 	"symbol"
// Function object(implements[ [ Call ] ] in ECMA - 262 terms) 	"function"
// Any other object 	"object"
