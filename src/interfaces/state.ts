//
export interface State<S extends State<Readonly<S>>> {
    readonly promiseOutput: Promise<any>
    readonly priorityRequest: Promise<boolean>
    readonly historyRequest: Promise<boolean>
    readonly requestFront: Promise<void>
    readonly requestFront: Promise<void>
    readonly nextRequest: Promise<Readonly<S>>
    readonly promiseNext: Promise<Readonly<S>>
    transition(next: S): Promise<void>
}
