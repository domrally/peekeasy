import { Sender } from '../../../../code/index.js';
export class RoomService {
    constructor() {
        this.test = new Sender();
        room = this;
    }
    static init() {
        delete this.init;
        return new RoomService();
    }
    get onTest() {
        return this.test.sent;
    }
}
let room;
export class Consumer {
    get roomService() {
        return room;
    }
}
