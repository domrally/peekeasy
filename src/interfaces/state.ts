//
export interface State<S extends State<Readonly<S>>> {
    readonly promiseOutput: Promise<Readonly<any>>
    readonly promiseNext: Promise<Readonly<S>>
    transition(next: S): Promise<void>
}
