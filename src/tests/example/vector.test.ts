import { Vector } from '../../exports/exports'

const vector = new Vector([{ text: 'Hello,' }, { text: 'vector!' }])

// Hello, vector!
console.log(...vector.text)
