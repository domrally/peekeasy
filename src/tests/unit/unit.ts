import { warn } from 'console'

//
warn('\n')

// delegate
warn('\n 🧪 delegates:')

import './delegate/delegate-call.test'
warn('\t ✅ call')

import './delegate/delegate-delete.test'
warn('\t ✅ delete')

import './delegate/delegate-has.test'
warn('\t ✅ has')

// event
warn('\n 🧪 events:')

import './event/event-call.test'
warn('\t ✅ call')

import './event/event-delete.test'
warn('\t ✅ delete')

import './event/event-has.test'
warn('\t ✅ has')

// iterable iterator
warn('\n 🧪 iterable iterators:')

import './iterable-iterator/iterable-iterator-for-of.test'
warn('\t ✅ for of')

import './iterable-iterator/iterable-iterator-next.test'
warn('\t ✅ next')

// stream
warn('\n 🧪 streams:')

import './stream/stream-delete-async.test'
warn('\t ✅ delete async')

//
warn('\n')
