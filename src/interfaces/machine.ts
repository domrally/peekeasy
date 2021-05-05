import { Updater } from './updater'

export interface Machine<T> extends Updater<T> {
    current: T
}