export class Grabber {
  constructor(context) {
    super(context);
    // can't do anything else for 5 seconds
    setTimeout(() => context.back(), 5000);
  }
}
