import { Updater } from './updater.js'
//
export interface State<T> extends Updater<T> {
    readonly onEnter: () => void
    readonly onExit: () => void
}
