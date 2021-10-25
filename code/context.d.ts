export declare type Key = string | number | symbol;
export declare class Context<S> {
    #private;
    get state(): S;
    set state(s: S);
}
