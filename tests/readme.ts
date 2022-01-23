import { Caller, Proxier } from '../code/index.js'

const log = () => console.log('listen')
const logger = { log } 

const { call, callBacks } = new Caller<typeof log>()
callBacks.add(log)
call()

const { proxy, setProxy } = new Proxier<typeof logger>()
setProxy(logger)
proxy.log()
