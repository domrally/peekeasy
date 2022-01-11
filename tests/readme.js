import { Holder, Sender } from '../code/index.js';
const log = () => console.log('listen');
const logger = { log };
const { send, sent } = new Sender(); // const listeners = new Set()
sent.add(log); // listeners.add(listener)
send(); // listeners.forEach(t => t())
const { held, hold } = new Holder(); // const holder = { held: null }
hold(logger); // holder.held = listener
held.log(); // holder.held.listen()
