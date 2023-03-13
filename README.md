# Get-Web-Page
This is a JavaScript code that uses the puppeteer library to scrape a web page. The code allows you to navigate to a URL, set a timeout, use a custom user agent, use a proxy server with or without authentication, take a screenshot, and save the page HTML.

**Disclaimer:** *Careful, the code is not neat and may cause a fit of uncontrollable rage in some users. It was written for a personal purpose for a specific task, but now I don't need it and don't mind sharing it.*

## Features
- Navigate to a URL
- Set a **timeout** in milliseconds
- Set a custom **user agent**
- Use a proxy server **with** or **without** authentication
- Take a **screenshot**
- Save the page HTML
- Use a **referrer** header

## Usage
To use this code, you need to have **puppeteer** and **yargs** installed. You can install them by running **npm install puppeteer yargs**.

To run the code, you need to pass the **--host** or **-url** option with a URL to navigate to. You can also pass other options to customize the behavior of the scraper. Here is an example command to run the scraper

```node index.js --url https://example.com --timeout 10000 --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3" --proxy http://localhost:8080 --username user --password pass --screenshot --screenshot-path screenshot.png --html-path page.html --referrer https://google.com```

This command navigates to **https://example.com** with a timeout of 10 seconds, a custom user agent, a proxy server with authentication, takes a screenshot and saves it to **screenshot.png**, saves the page HTML to **page.html**, and uses **https://google.com** as a referrer header.

## License
This software is released under the LGPL-3.0 License, see LICENSE.
