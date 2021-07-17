export function compose(Base) {
    return class _ extends Base {
        async *[Symbol.asyncIterator]() {
            yield* this.state;
        }
    };
}
