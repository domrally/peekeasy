import { State } from '../../../../index.js'
import { Triggers } from '../triggers.js'

export abstract class Chronograph extends State<Chronograph, Triggers> {
	// 
	abstract top(): void
	abstract split(): void
	// 
	time = 0
	lap = 0
}