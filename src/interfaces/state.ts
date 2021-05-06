//
export interface State<S extends State<Readonly<S>>> {
    readonly promiseOutput: Promise<any>
    readonly promiseNext: Promise<Readonly<S>>
    transition(next: S): Promise<void>
}
