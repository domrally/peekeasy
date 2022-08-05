import { Vector } from '../../exports/exports'

const vector = new Vector({ word: 'Hello,' }, { word: 'vector!' })

// Hello, vector!
console.log(...vector.word)
