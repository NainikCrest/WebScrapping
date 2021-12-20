const { RECORD_FOUND, OK } = require("../../helpers/constants");
const puppeteer = require("puppeteer");
const headless = false; // Wether to open the URL in browser or Notification

const serversList = require("../../helpers/servers");
let si = 0;
const getHost = () => {
  si++;
  if (si === serversList.length) si = 0;
  const [host, port] = serversList[si].split(":");
  return { host, port };
};

/**
 * @api {get} /faceBookAd/
 * @apiDescription Get Facebook Ad's List Data
 * @apiGroup facebookAd /
 *
 * @apiSuccess (200) {Object} data Of Facebook Ad Page
 * @apiPermission Any
 * @apiVersion 1.0.0 (/api/v1/)
 */
exports.faceBookAd = async (req, res, next) => {
  try {
    //  Browser Configuration to launch site
    // const tempHost = getHost();
    // console.log(tempHost);
    const browser = await puppeteer.launch({
      // pipe: true, // Connects to the browser over a pipe instead of a WebSocket. Defaults to false
      devtools: false, // Whether to auto-open a DevTools panel for each tab. If this option is true, the headless option will be set false
      headless, // Whether to run browser in headless mode. Defaults to true unless the devtools option is trues
      timeout: 0, // Maximum time in milliseconds to wait for the browser instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      defaultViewport: false, // To set screen size in launch
      userDataDir: "./cache", // To download the caches
      executablePath:
        // "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default,
      // Path to a browser executable to run instead of the bundled Chromium.
      args: [
        "--start-maximized",
        // `--proxy-server=${tempHost.host}:${tempHost.port}`,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ], // Additional arguments to pass to the browser instance
    });

    // Rendering Page
    // Promise which resolves to a new Page object. The Page is created in a default browser context.
    const page = await browser.newPage();
    // await page.authenticate({
    //   username: "Crest",
    //   password: "crest123",
    // });

    // req.query.link = `http://api.scraperapi.com?api_key=e27d806b4fe8cb927819eacaf49b0b6b&url=${req.query.link}&render=true&country_code=us`;
    // URL to navigate page to.
    await page.goto(req.query.link, {
      timeout: 0, // Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
      waitUntil: ["networkidle0", "load"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
    });

    // Enabling request interception disables page caching.
    page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      if (
        interceptedRequest.url().endsWith(".png") ||
        interceptedRequest.url().endsWith(".jpg")
      )
        interceptedRequest.abort();
      else interceptedRequest.continue();
    });

    // Wrapping/Finding up the AD Element
    const productHandlers = await page.$$(
      "._8n-x > div._8n_0 > div._9ccv._9raa"
    );

    const ADList = [];
    // Looping through all AD's Element Group
    for (let indexP = 0; indexP < productHandlers.length; indexP++) {
      const producthandle = productHandlers[indexP];
      let title = null;
      const tempObj = {};
      try {
        // Function to be evaluated in the page context
        title = await page.evaluate(
          (el) =>
            el.querySelector(
              "div > div._9ccv._9raa > div > div._9guv._9rab > div > div > span"
            ).textContent,
          producthandle
        );
        tempObj.title = title;

        // The method runs document.querySelectorAll within the page. If no elements match the selector, the return value resolves to []
        const contentHandlers = await page.$$("div > div._9cb_", producthandle);
        const contentArr = [];
        const element = contentHandlers[indexP];
        let ids = [];
        let status = [];
        try {
          // This method runs document.querySelectorAll within the element and passes it as the first argument to pageFunction. If there's no element matching selector, the method throws an error.
          ids = await element.$$eval(
            "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > div.o0aczdgd > div > span",
            (idsEle) => {
              return idsEle.map((idEl) => idEl.textContent);
            }
          );
        } catch (error) { }
        try {
          status = await element.$$eval(
            "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j",
            (statusEle) => {
              return statusEle.map((statusEl) => statusEl.textContent);
            }
          );
        } catch (error) { }
        for (let index = 0; index < ids.length; index++) {
          const element = ids[index];
          const content = {
            id: element.split(" ")[1], status: status[index]
          };
          contentArr.push(content);
        }
        tempObj.content = contentArr;
        ADList.push({ ...tempObj });
      } catch (error) { }
    }

    await page.screenshot({
      path: "FacebookAD.jpeg", // The file path to save the image to.
      quality: 100, //The quality of the image, between 0-100. Not applicable to png images
      fullPage: true, // When true, takes a screenshot of the full scrollable page. Defaults to false.
    });

    // await page.emulateMediaType("screen");
    // await page.pdf({ path: "page.pdf" });
    if (headless) await page.pdf({ path: "capture.pdf", format: "A0" });

    await browser.close();

    return res.status(OK).json({
      data: ADList,
      code: OK,
      message: RECORD_FOUND,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @api {get} /faceBookAd/
 * @apiDescription Get Facebook Ad's List Data
 * @apiGroup facebookAd /
 *
 * @apiSuccess (200) {Object} data Of Facebook Ad Page
 * @apiPermission Any
 * @apiVersion 1.0.0 (/api/v1/)
 */
exports.faceBookAdForm = async (req, res, next) => {
  try {
    //  Browser Configuration to launch site

    const browser = await puppeteer.launch({
      pipe: true, // Connects to the browser over a pipe instead of a WebSocket. Defaults to false
      devtools: false, // Whether to auto-open a DevTools panel for each tab. If this option is true, the headless option will be set false
      headless, // Whether to run browser in headless mode. Defaults to true unless the devtools option is trues
      timeout: 0, // Maximum time in milliseconds to wait for the browser instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      defaultViewport: false, // To set screen size in launch
      userDataDir: "./cache", // To download the caches
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default,
      // Path to a browser executable to run instead of the bundled Chromium.
      args: [
        // "--proxy-server=XXXXXX",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ], // Additional arguments to pass to the browser instance
    });

    // Rendering Page
    // Promise which resolves to a new Page object. The Page is created in a default browser context.
    const page = await browser.newPage();
    // page.authenticate({
    //   username: "XYZ",
    //   password: "YYY",
    // });

    // URL to navigate page to.
    await page.goto(req.query.link, {
      timeout: 0, // Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
      waitUntil: ["networkidle0", "load"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
    });

    // Enabling request interception disables page caching.
    page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      if (
        interceptedRequest.url().endsWith(".png") ||
        interceptedRequest.url().endsWith(".jpg")
      )
        interceptedRequest.abort();
      else interceptedRequest.continue();
    });

    await page.type("#fullname", req.query.name);
    await page.type("#email", req.query.email);
    await page.screenshot({
      path: "formFill.png",
      fullPage: true,
    });

    await Promise.all([
      page.waitForNavigation(),
      page.click("#_form_5_submit"),
    ]);

    if (headless) await page.pdf({ path: "form.pdf", format: "A0" });
    await page.screenshot({
      path: "form.png",
      fullPage: true,
    });
    await browser.close();
    return res.status(OK).json({
      data: "Success",
      code: OK,
      message: RECORD_FOUND,
    });
  } catch (error) {
    return next(error);
  }
};
