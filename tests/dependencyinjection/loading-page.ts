import { Page } from "./page.js";

export class LoadingPage implements Page {
  get name(): string {
    return "Loading";
  }
}
