export declare class Timer {
    #private;
    set total(value: number);
    get total(): number;
    set lap(value: number);
    get lap(): number;
    get totaller(): {
        [Symbol.asyncIterator](): AsyncIterator<string>;
    };
    get lapper(): {
        [Symbol.asyncIterator](): AsyncIterator<string>;
    };
}
