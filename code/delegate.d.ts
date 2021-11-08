import { Action } from "./action.js";
export declare type Delegate = Action & {
    on?(receiver: Action): void;
    off?(receiver: Action): void;
};
