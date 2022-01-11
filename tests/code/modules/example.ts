import '../app.js'
import { Tester } from './consumers/tester.js'
import { events } from './events/listener.js'

const { onTest } = events
onTest.add(() => console.log('example'))

const tester = new Tester()
tester.test()
