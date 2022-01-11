var _a, _b;
//     ╭─model──────────────╮
//  ╭──→ consumer → service ├╮
// app╮╰────────────────────╯│
// ╰┬─╯╭─global────────────╮ │
//  ╰──→ listener → events │←╯
//     ╰───────────────────╯
import { Listener } from './modules/events/listener.js';
import { RoomService } from './modules/services/room-service.js';
// start global event system and initialize services
const room = (_a = RoomService.init) === null || _a === void 0 ? void 0 : _a.call(RoomService);
(_b = Listener.init) === null || _b === void 0 ? void 0 : _b.call(Listener, room);
