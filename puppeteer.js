// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagetypeselector-text-options
const puppeteer = require('puppeteer');

// (async() => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.chromestatus.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'test_reports/puppeteer/page.pdf', format: 'A4'});
//
//   await browser.close();
// })();


const url = process.env.CONSOLE_URL;


(async() => {
  if(!url) {
    throw new Error('process.env.CONSOLE_URL required');
  } else {
    console.log('Visiting', url);
  }
  try {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      // headless: false // for debugging visually
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    await page.waitForSelector('#inputUsername');
    await page.type('#inputUsername','jabba');
    await page.type('#inputPassword','jabba');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ timeout: 5 * 1000 });
    await page.waitForSelector('h1');
    // only for chrome headless
    // await page.pdf({path: 'test_reports/puppeteer/console-catalog.pdf', format: 'A4'});
    await page.screenshot({path: 'test_reports/puppeteer/console-catalog.png'});
    await browser.close();
  } catch(e) {
    console.log('Something failed:');
    console.log(e);
  }

})();
