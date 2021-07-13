import { createTriggers } from '../mealtime.js';
declare const Top: unique symbol, Side: unique symbol;
export declare const Buttons: Readonly<{
    readonly Top: typeof Top;
    readonly Side: typeof Side;
}>;
export declare type Buttons = createTriggers<typeof Buttons>;
export {};
