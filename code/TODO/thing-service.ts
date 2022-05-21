import { Caller } from '../exports'

export class ThingService {
   #rrr = new Caller()
   protected get onR() {
      return this.#rrr.callbacks;
   }
   protected talk() {}
}
