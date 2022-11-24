import { BeforeAll, AfterAll, Before, ITestCaseHookParameter } from "@cucumber/cucumber";
import { chromium, ChromiumBrowser, ConsoleMessage } from "@playwright/test";
import { config } from "./config";
import { ICustomWorld } from "./custom-world";

let browser: ChromiumBrowser;

declare global {
    var browser: ChromiumBrowser
}

BeforeAll(async function () {
    browser = await chromium.launch(config.browserOptions);
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    this.startTime = new Date();
    this.testName = pickle.name.replace(/\W/g, '-');
    // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
    this.context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
        viewport: { width: 1200, height: 800 },
    });

    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
    this.page.on('console', async (msg: ConsoleMessage) => {
        if (msg.type() === 'log') {
            await this.attach(msg.text());
        }
    });
    this.feature = pickle;
});

AfterAll(async function () {
    await browser.close();
});