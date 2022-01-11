import { Holder, Sender } from '../../../../code/index.js'
import { Events } from './events.js'
import { Publisher } from './publisher.js'

let { held, hold } = new Holder<Listener>()

export const events = held

export class Listener implements Publisher<Events> {
	static init?(...args: (Partial<Publisher<Events>> | undefined)[]) {
		delete this.init

		return new Listener(...args)
	}
	
	readonly onTest!: WeakSet<() => void>
	
	private constructor(...args: (Partial<Publisher<Events>> | undefined)[]) { 
		hold(this)
		
		for (const key in Events) {
			const { send, sent } = new Sender();
			
			(this as any)[key] = sent
			
			args.forEach((publisher: any) => {
				const onPublish = publisher?.[key]
				
				onPublish?.add(send)
			})
		}
	}
}