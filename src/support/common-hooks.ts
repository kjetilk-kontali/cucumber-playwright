import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, ChromiumBrowser } from "@playwright/test";
import { config } from "./config";

let browser: ChromiumBrowser;

declare global {
    var browser: ChromiumBrowser
}

BeforeAll(async function(){
    browser = await chromium.launch(config.browserOptions);
});

AfterAll(async function() {
    await browser.close();
});