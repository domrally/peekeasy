import { Updater } from './updater'
//
export interface State<T> extends Updater<T> {
    readonly onEnter: () => void
    readonly onExit: () => void
}
