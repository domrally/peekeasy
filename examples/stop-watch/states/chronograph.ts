import { State } from '../../../src/state.js'
import { Triggers } from './triggers.js'

export abstract class Chronograph extends State<Chronograph, Triggers> {
	// 
	abstract top(): void
	abstract side(): void
	// 
	constructor(protected times: { total: number, lap: number }) {
		super()
	}
}