import { Builder,By,Capabilities,until,WebDriver,WebElement,Actions } from "selenium-webdriver";
const chromedriver= require('chromedriver');

interface Options {
    driver?: WebDriver;
    url?: string;

};

export class BasePage {
    driver: WebDriver;
    url: string;

    constructor(options?: Options) {
        if(options && options.driver) this.driver = options.driver
        else 
        this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
        if(options && options.url) this.url = options.url
    };

    async navigate(url?: string): Promise<void> {
        if(url) return await this.driver.get(url)
        else if (this.url) return await this.driver.get(this.url)
        else
        return Promise.reject('BasePage needs a url in the test or the page object.')
    };

    async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
    };

    async click(elementBy: By): Promise<void>{
        return (await this.getElement(elementBy)).click();
    };

    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy);
        await input.clear();
        return input.sendKeys(keys);
    };

    async getText(elementBy: By): Promise<string> {
        return (await this.getElement(elementBy)).getText();
    };

    async getAttribute(elementBy: By, attribute: string): Promise<string> {
        return (await this.getElement(elementBy)).getAttribute(attribute);
    };

    actionWiggle(actions: Actions, originElemnet: WebElement, moveDurationMs: number= 100): Actions {
        return actions.move({origin: originElemnet, duration: moveDurationMs})
        .move({origin:originElemnet, x:10, y:0, duration: moveDurationMs})
        .move({origin:originElemnet, x:0, y:10, duration: moveDurationMs})
        .move({origin:originElemnet, x:10, y:0, duration: moveDurationMs})
        .move({origin:originElemnet, x:0, y:10, duration: moveDurationMs})
        .pause(moveDurationMs)
    };



};