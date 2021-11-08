import { Page } from "./page.js";

export class HomePage implements Page {
  get name(): string {
    return "Home";
  }
}
