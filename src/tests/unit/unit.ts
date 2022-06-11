import { warn } from 'console'

//
warn('\n')

// delegate
warn('\n🧪 delegates:')

import './delegate/delegate-call.test'
warn('\t✅ call')

import './delegate/delegate-delete.test'
warn('\t✅ delete')

import './delegate/delegate-has.test'
warn('\t✅ has')

// event
warn('\n🧪 events:')

import './event/event-call.test'
warn('\t✅ call')

import './event/event-delete.test'
warn('\t✅ delete')

import './event/event-has.test'
warn('\t✅ has')

// iterable iterator
warn('\n🧪 iterable iterators:')

import './iterable-iterator/iterable-iterator-for-of.test'
warn('\t✅ for of')

import './iterable-iterator/iterable-iterator-next.test'
warn('\t✅ next')

// iterator result value
warn('\n🧪 iterator result values:')

import './iterator-result-value/iterator-result-value-value.test'
warn('\t✅ value')

// stream
warn('\n🧪 streams:')

import './stream/stream-delete-async.test'
warn('\t✅ delete async')

// vector
warn('\n🧪 vectors:')

import './vector/vector-apply.test'
warn('\t✅ apply')

import './vector/vector-key.test'
warn('\t✅ key')

import './vector/vector-keys.test'

//
warn('\n')
