//     ╭─model──────────────╮
//  ╭──→ service ← consumer ├╮
// app╮╰────────────────────╯│
// ╰┬─╯╭─global────────────╮ │
//  ╰──→ listener → events │←╯
//     ╰───────────────────╯
import { Listener } from './modules/events/listener.js'
import { RoomService } from './modules/services/room-service.js'

// start global event system and initialize services
const room = RoomService.init?.()
Listener.init?.(room)
