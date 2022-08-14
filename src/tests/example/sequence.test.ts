import { Sequence } from '../../exports/exports'

const tree = new Sequence(
	//
	() => Promise.resolve('Hello, sequence!'),
	//
	Promise.reject
)

tree().then(console.log)
