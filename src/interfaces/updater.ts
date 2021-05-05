export interface Updater<T> {
    readonly untilUpdate: Promise<T>
}