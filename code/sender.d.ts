import { Action } from "./action.js";
export declare type Sender = WeakSet<Action> & Action;
export declare function sender(): Sender;
