import { Updater } from './updater.js'

export interface Machine<T> extends Updater<T> {
    current: T
}