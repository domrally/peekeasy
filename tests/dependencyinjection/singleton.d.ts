export declare function Singleton<T>(instance?: T): {
    new (): {};
    readonly "__#2@#instance": T;
    readonly Instance: T;
};
