declare const Top: unique symbol, Side: unique symbol;
export declare const Buttons: Readonly<{
    readonly Top: typeof Top;
    readonly Side: typeof Side;
}>;
declare type Triggers<T, K extends keyof T> = T[K];
export declare type Buttons = Triggers<typeof Buttons, keyof typeof Buttons>;
export {};
