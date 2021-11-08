import { PageProxy } from "./page-machine.js";
import { Singleton } from "./singleton.js";
export class Page extends Singleton(PageProxy) {
}
