import { Google } from "./googleBP";

const tvpage = new Google();
const fs = require('fs');

test('do a search', async() => {
    await tvpage.navigate();
    await tvpage.search('Will and Grace tv series');
    let text = await tvpage.getResutls();
    expect(text).toContain("Will and Grace");
    await fs.writeFile(`${__dirname}/WG.png`,
    await tvpage.driver.takeScreenshot(), 'base64',
    (e)=> {
        if (e) console.error(e)
        else console.log('You did it!')
    });
    await tvpage.driver.quit();
});