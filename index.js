const puppeteer = require('puppeteer');
const yargs = require('yargs');

const argv = yargs
    .options({
        'host': { alias: 'url', type: 'string', demandOption: true, describe: 'URL to navigate to' },
        't': { alias: 'timeout', type: 'number', describe: 'Timeout in milliseconds', default: 5000 },
        'ua': { alias: 'user-agent', type: 'string', describe: 'User agent string' },
        'proxy': { type: 'string', describe: 'Proxy server to use' },
        'username': { type: 'string', describe: 'Username for proxy authentication' },
        'password': { type: 'string', describe: 'Password for proxy authentication' },
        'screenshot': { type: 'boolean', describe: 'Whether to take a screenshot', default: false },
        'screenshot-path': { type: 'string', describe: 'Path to save the screenshot', default: 'screenshot.png' },
        'html-path': { type: 'string', describe: 'Path to save the page HTML', default: 'page.html' },
        'ref': { alias: 'referer', type: 'string', describe: 'Value for the Referrer header' }
    })
    .help()
    .argv;

if (!argv.url || argv.help) {
    yargs.showHelp();
    process.exit();
}

async function run () {
    const url = argv.url;
    const timeout = argv.timeout;
    const userAgent = argv['user-agent'];
    const proxy = argv.proxy;
    const username = argv.username;
    const password = argv.password;
    const takeScreenshot = argv.screenshot;
    const screenshotPath = argv['screenshot-path'];
    const pageHtmlPath = argv['html-path'];
    const referrer = argv.referrer;

    const browser = await puppeteer.launch({ args: proxy ? [`--proxy-server=${proxy}`, '--no-sandbox'] : [] });
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
    if (referrer) {
        await page.setExtraHTTPHeaders({ 'Referer': referrer });
    }
    await page.goto(url, { 
    waitUntil: 'networkidle0', // Wait for the page to load
    followRedirects: false // Don't follow redirects
    });
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
