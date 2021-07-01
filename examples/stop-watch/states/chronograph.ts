import { State } from '../../../src/state.js'
import { Timer } from './timer.js'
import { Triggers } from './triggers.js'

export abstract class Chronograph extends State<Chronograph, Triggers> {
	// 
	abstract top(): void
	abstract side(): void
	// 
	constructor(protected times: Timer) {
		super()
	}
	async *totaller() {
		yield* this.times.totaller
	}
	async *lapper() {
		yield* this.times.lapper
	}
}