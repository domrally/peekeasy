import { Delegate, Sender } from "../../index.js";
declare class EventService extends Sender {
    started: Delegate;
}
export declare const Events: Readonly<EventService>;
export {};
