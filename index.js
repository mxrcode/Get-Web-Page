const puppeteer = require('puppeteer');

const url = process.argv[2];
if (!url) {
    console.log("\n");
    console.log('\x1b[31m', "Please provide URL as a first argument");
    console.log('\x1b[32m', "Example: node index.js https://url.com/ timeout userAgent proxy:port username password");
    console.log('\x1b[32m', "And you can use --no-screenshot, to disable the screenshot function.");
    console.log('\x1b[0m', '');
    return;
}
let timeout = process.argv[3];
if (!timeout) {
    timeout = 5000;
}
const userAgent = process.argv[4];
const proxy = process.argv[5];
const username = process.argv[6];
const password = process.argv[7];
const takeScreenshot = !process.argv.includes('--no-screenshot');
const screenshotPath = process.argv[8] || 'screenshot.png';
const pageHtmlPath = process.argv[9] || 'page.html';

async function run () {
    let browser;
    if (proxy) {
        browser = await puppeteer.launch({
            args: [`--proxy-server=socks5://${proxy}`, '--no-sandbox']
        });
    } else {
        browser = await puppeteer.launch();
    }
    const page = await browser.newPage();
    if (username && password) {
        await page.authenticate({ username, password });
    }
    if (userAgent) {
        await page.setUserAgent(userAgent);
    }
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    });
    await page.goto(url);
    await page.waitForTimeout(timeout);
    if (takeScreenshot) {
        await page.screenshot({
            path: screenshotPath,
            // fullPage: true,
        });
    }
    const content = await page.content();
    require('fs').writeFileSync(pageHtmlPath, content);
    browser.close();
}

run();
