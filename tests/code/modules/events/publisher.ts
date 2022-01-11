import { Events } from './events.js'

export type Publisher<T extends Events> = Pick<Record<Events, WeakSet<() => void>>, T>
