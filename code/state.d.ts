export interface State<T extends symbol> extends AsyncIterable<T> {
    trigger: (event: T) => void;
}
export declare const State: <S extends symbol>() => State<S>;
