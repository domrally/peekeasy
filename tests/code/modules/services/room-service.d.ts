import { Sender } from '../../../../code/index.js';
import { Events } from '../events/events.js';
import { Publisher } from '../events/publisher.js';
export declare class RoomService implements Publisher<Events.onTest> {
    static init?(): RoomService;
    private constructor();
    get onTest(): WeakSet<() => void>;
    test: Sender<() => void>;
}
export declare abstract class Consumer {
    protected get roomService(): RoomService;
}
