export declare type Selector<S extends {}> = ProxyHandler<S> & ((s?: S) => void);
export declare function selector<S extends {}>(): Selector<S>;
