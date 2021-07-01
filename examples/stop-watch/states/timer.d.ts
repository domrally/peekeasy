export declare class Timer {
    #private;
    set total(value: number);
    get total(): number;
    set lap(value: number);
    get lap(): number;
    totaller(): AsyncIterator<string>;
    lapper(): AsyncIterator<string>;
}
