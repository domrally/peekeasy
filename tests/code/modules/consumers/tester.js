import { Consumer } from '../services/room-service.js';
export class Tester extends Consumer {
    test() {
        this.roomService.test.send();
    }
}
