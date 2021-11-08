import { Context } from "../../index.js";
import { Mover } from "./Mover.js";

class Fighter extends Mover {
  block = () => this.context.target = this.#blocker;
  hit = () => this.context.target = this.#hitter;
  grab = () => this.context.target = this.#grabber;
  constructor() {
    super(new Context());
    this.context.target = this;
    return this.context.target; // return this.#context.target as any
  }
  #blocker = new Blocker(this.context);
  #hitter = new Hitter(this.context);
  #grabber = new Grabber(this.context);
}

const fighter = new Fighter();
console.log(fighter.state); // tv is off

fighter.power();
console.log(fighter.state); // tv is on
