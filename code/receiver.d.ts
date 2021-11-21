import { Action } from "./action.js";
export declare type Receiver = WeakSet<Action>;
export declare function receiver(delegates: Receiver): Receiver;
