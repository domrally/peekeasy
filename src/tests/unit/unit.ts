import { warn } from 'console'

warn('\n🧪 delegates:')
import './forward/delegate-add.test'
import './forward/delegate-call.test'
import './forward/delegate-delete.test'
import './forward/delegate-has.test'

warn('\n🧪 events:')
import './event/event-call.test'
import './event/event-delete.test'
import './event/event-has.test'

warn('\n🧪 iterator result values:')
import './reference/iterator-result-value-value.test'

warn('\n🧪 vectors:')
import './vector/vector-apply.test'
import './vector/vector-key.test'
import './vector/vector-keys.test'

warn('\n🧪 streams:')
import './event/stream-delete-async.test'
import './event/stream-await-async.test'
