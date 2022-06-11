import { warn } from 'console'

import './delegate/call.test'
warn('✅ call')

import './stream/callbacks-delete-async.test'
warn('✅ callbacks-delete-async')

import './delegate/callbacks-delete.test'
warn('✅ callbacks-delete')

import './delegate/callbacks-has.test'
warn('✅ callbacks-has')
