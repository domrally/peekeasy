import { PageProxy } from "./page-machine.js";
import { Singleton } from "./singleton.js";

export abstract class Page extends Singleton<Page>(PageProxy) {
  abstract get name(): string;
}
