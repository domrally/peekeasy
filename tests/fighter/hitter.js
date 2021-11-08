export class Hitter {
  constructor(context) {
    super(context);
    // can't do anything else for 5 seconds
    setTimeout(() => this.context.back(), 5000);
  }
  hit = () => this.context.target = this.#h2;
}
