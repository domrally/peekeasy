import { State } from '../../../../src/main.js'
import { Triggers } from '../triggers.js'

export abstract class Chronograph extends State<Chronograph, Triggers> {
	// 
	abstract top(): void
	abstract side(): void
	// 
	constructor(protected times: { total: number, lap: number }) {
		super()
	}
	// 
	get total() {
		return this.times.total
	}
	get lap() {
		return this.times.lap
	}
}