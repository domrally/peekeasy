//
export class Mealy<S extends object> implements AsyncIterable<S>, ProxyHandler<S> {
    // just here for the lolz
    readonly [Symbol.asyncIterator] = () => this.stateMachine[Symbol.asyncIterator]()
    // 
    constructor(public proxy: S, private stateMachine: AsyncIterable<S>) {
        let currentState = proxy
        // 
        ;(async () => {
            for await (currentState of stateMachine) { }
        })()
        // 
        const handler: ProxyHandler<S> = {
            get: (_: S, property: any): any => (currentState as any)[property],
            set: (_: S, property: any, value: any) => (currentState as any)[property] = value
        }
        proxy = new Proxy(currentState, handler)
    }
}
