const fs = require("fs");
const puppeteer = require("puppeteer");
const { RECORD_FOUND, OK } = require("../../helpers/constants");
const serversList = require("../../helpers/servers");

const headless = false; // Wether to open the URL in browser or Notification
let si = 0;
const getHost = () => {
  si++;
  if (si === serversList.length) si = 0;
  const [host, port] = serversList[si].split(":");
  return { host, port };
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

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
      waitUntil: ["networkidle0", "load", "networkidle2", "domcontentloaded"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
    });

    // Enabling request interception disables page caching.
    // page.setRequestInterception(true);
    // page.on("request", (interceptedRequest) => {
    //   if (
    //     interceptedRequest.url().endsWith(".png") ||
    //     interceptedRequest.url().endsWith(".jpg")
    //   )
    //     interceptedRequest.abort();
    //   else interceptedRequest.continue();
    // });
    // 
    await autoScroll(page)
    // Wrapping/Finding up the AD Element
    const productHandlers = await page.$$(
      "._9ccv._9raa", options => options.map(option => option.innerHTML));

    const ADList = []
    for (let index = 0; index < productHandlers.length; index++) {
      const element = productHandlers[index];

      let title, ADHandlers = [];
      let tempObj = {};

      // Fetching Title for AD's year
      try {
        title = await element.$eval(
          ".qku1pbnj.bnyswc7j.dnfrlon8.ga2uhi05.t486r87n.svz86pwt.aa8h9o0m.a53abz89", (node) => {
            return node.innerText;
          });
      } catch (error) { title = null; }

      // Fetching AD according to year
      try {
        ADHandlers = await element.$$(
          "._9b9p._99s6", options => options.map(option => option.innerHTML));
      } catch (error) { ADHandlers = []; }


      let SubADList = [];

      // Iterating AD according to year
      for (let indexJ = 0; indexJ < ADHandlers.length; indexJ++) {
        const ADelement = ADHandlers[indexJ];

        let status, id, start_running, multiple_version, video_url, form_url, ADObj = {};

        // Getting AD status
        try {
          status = await ADelement.$eval(
            ".qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j", (node) => {
              return node.innerText;
            });
        } catch (error) { status = null; }

        // Getting AD id
        try {
          id = await ADelement.$eval(
            "div.rxo4gu2c.fij28k4b > .qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89", (node) => {
              return node.innerText.split(" ")[1];
            });
        } catch (error) { id = null; }

        // Getting AD support multiple version text 
        try {
          multiple_version = await ADelement.$eval(
            "div.m8urbbhe.fv962s72 > span.i0ppjblf.c7hevu8o > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89", (node) => {
              return node.innerText;
            });
        } catch (error) { multiple_version = null; }

        try {
          video_url = await ADelement.$eval(
            "div._8o0a._8o0b > video", (node) => {
              return node.src;
            });
        } catch (error) { video_url = null; }

        try {
          form_url = await ADelement.$eval(
            "a.d5rc5kzv.chuaj5k6.qku1pbnj.j8otv06s.a1itoznt.fvlrrmdj.svz86pwt.aa8h9o0m.jrvjs1jy.jrkk970q", (node) => {
              return node.href;
            });
        } catch (error) { form_url = null; }
        // try {
        //   await ADelement.$eval(
        //     "div.tb4cuiq2.kojzg8i3.rwb8dzxj.yukb02kx.duy2mlcu.dcpru2rv.sdif6bng.dhycqfdu > div", (node) => {
        //       return node.click();
        //     });

        //   // const ADDetails = await page.$$(
        //   //   ".g8i8uhsi.a9l0cfhd.itch7skr.k8ssb1ca.apr27be3.elum7zft.booyz79o.e7jxmo73.fg06um2h.sxkbt2j3.pty309aw.pesago7c.b6ewvobd.qi2u98y8.ol91lf0t.pg3nr1hp.gp6ucdfj.n6ukeyzl", options => options.map(option => option.innerHTML));
        // } catch (error) { multiple_version = null; }
        // const ADDetails = await page.$$(
        //   ".g8i8uhsi.a9l0cfhd.itch7skr.k8ssb1ca.apr27be3.elum7zft.booyz79o.e7jxmo73.fg06um2h.sxkbt2j3.pty309aw.pesago7c.b6ewvobd.qi2u98y8.ol91lf0t.pg3nr1hp.gp6ucdfj.n6ukeyzl",
        //   options => options.length);
        // console.log("indexJ", indexJ, "index", index, ADDetails)

        // for (let indexK = 0; indexK < ADDetails.length; indexK++) {
        //   const adDetailEle = ADDetails[indexK];
        //   let
        //   try {
        //     idDetail = await adDetailEle.$eval(
        //       "div.m8urbbhe.fv962s72 > span.i0ppjblf.c7hevu8o > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89", (node) => {
        //         return node.innerText;
        //       });
        //   } catch (error) { idDetail = null; }
        // }

        // if (indexJ === 0 && index === 0) await fs.writeFile("adH.js", ADDetails);
        ADObj.status = status;
        ADObj.id = id;
        ADObj.multiple_version = multiple_version;
        ADObj.video_url = video_url;
        ADObj.form_url = form_url;
        SubADList.push({ ...ADObj });

        // .g8i8uhsi.a9l0cfhd.itch7skr.k8ssb1ca.apr27be3.elum7zft.booyz79o.e7jxmo73.fg06um2h.sxkbt2j3.pty309aw.pesago7c.b6ewvobd.qi2u98y8.ol91lf0t.pg3nr1hp.gp6ucdfj.n6ukeyzl
      }

      tempObj.title = title;
      tempObj.SubADList = SubADList;
      ADList.push({ ...tempObj });
    }

    // await page.screenshot({
    //   path: "FacebookAD.jpeg", // The file path to save the image to.
    //   quality: 100, //The quality of the image, between 0-100. Not applicable to png images
    //   fullPage: true, // When true, takes a screenshot of the full scrollable page. Defaults to false.
    // });

    // await page.emulateMediaType("screen");
    // await page.pdf({ path: "page.pdf" });
    // if (headless) await page.pdf({ path: "capture.pdf", format: "A0" });

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
