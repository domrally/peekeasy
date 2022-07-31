import { warn } from 'console'

warn('\n🧪 delegates:')
import './forward/forward.add.test'
import './forward/forward.apply.test'
import './forward/forward.delete.test'
import './forward/forward.has.test'

warn('\n🧪 events:')
import './delegate/delegate.add.test'
import './delegate/delegate.delete.test'
import './delegate/delegate.has.test'

warn('\n🧪 iterator result values:')
import './reference/reference.equals.test'

warn('\n🧪 vectors:')
import './vector/vector.apply.test'
import './vector/vector.get.test'
import './vector/vector.symbol.iterator.test'

warn('\n🧪 streams:')
import './delegate/delegate.symbol.async-iterator.test'
import './delegate/delegate.then.test'
