import { Action } from "./action.js";

export type Delegate = Action & {
  on?(receiver: Action): void;
  off?(receiver: Action): void;
};
