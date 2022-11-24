import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config } from '../support/config';
import { ICustomWorld } from '../support/custom-world';

Given("a user wants to request a trial on Edge", async function (this: ICustomWorld) {
    await this.page?.goto(config.BASE_URL);
    await this.page?.getByRole('heading', { name: 'Start your 30-day free trial' }).click();

});

When('the user fills out the first name', async function (this: ICustomWorld) {
    await this.page?.getByLabel('First name*').fill('John');
});

When('submits the request', async function (this: ICustomWorld) {
    await this.page?.getByRole('button', { name: 'Submit request' }).click();
});

Then('an error message should be displayed', async function (this: ICustomWorld) {
    await expect(this.page?.getByText('Last name is required')).not.toBeNull();
});