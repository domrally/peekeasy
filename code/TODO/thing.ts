import { ThingService } from './thing-service'

export class Thing extends ThingService {
   constructor() {
      super()
      ThingService.onR.add(() => console.log('rrr'))
   }
}
