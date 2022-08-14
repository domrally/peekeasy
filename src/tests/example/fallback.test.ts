import { Fallback } from '../../exports/exports'

const tree = new Fallback(
	//
	Promise.reject,
	//
	() => Promise.resolve('Hello, fallback!')
)

tree().then(console.log)
