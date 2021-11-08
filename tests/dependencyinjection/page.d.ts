declare const Page_base: {
    new (): {};
    readonly "__#2@#instance": Page;
    readonly Instance: Page;
};
export declare abstract class Page extends Page_base {
    abstract get name(): string;
}
export {};
