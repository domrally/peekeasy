import { Holder, Sender } from '../code/index.js'

const log = () => console.log('listen')
const logger = { log } 

const { send, sent } = new Sender<typeof log>() // const listeners = new Set()
sent.add(log) // listeners.add(listener)
send() // listeners.forEach(t => t())

const { held, hold } = new Holder<typeof logger>() // const holder = { held: null }
hold(logger) // holder.held = listener
held.log() // holder.held.listen()
