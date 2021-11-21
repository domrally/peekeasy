declare type Action = () => void;
export declare function Receiver(delegates: WeakSet<Action>): WeakSet<Action>;
export {};
