export class Mover {
  constructor(parent) {
    this.parent = parent;
    return undefined;
  }
  get context() {
    return this.parent.context;
  }
  block() {}
  hit() {}
  grab() {}
}
