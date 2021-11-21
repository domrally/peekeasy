declare type Action = () => void;
export declare function Sender(): {
    (): void;
    add(t: Action): Set<Action>;
    delete(t: Action): boolean;
    has(t: Action): boolean;
    [Symbol.toStringTag]: string;
};
export {};
