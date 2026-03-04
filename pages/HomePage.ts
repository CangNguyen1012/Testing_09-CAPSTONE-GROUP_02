import { Page } from "@playwright/test";
import { Header } from "./components/Header";

export class HomePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

    async goto(): Promise<void> {
        await this.page.goto("/", {
            waitUntil: "commit",
        })
       
    }
}