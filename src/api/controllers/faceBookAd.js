const { RECORD_FOUND, OK } = require("../../helpers/constants");
const puppeteer = require("puppeteer");
const fs = require("fs");

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
    const headless = false;
    //  Browser Configuration to launch site
    const browser = await puppeteer.launch({
      pipe: true,
      headless, // To display actions
      devtools: true, // To enable devtools
      defaultViewport: false, // To set screen size in launch
      // userDataDir: "./temp", // To caputure the caches
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default
    });

    // Rendering Page
    const page = await browser.newPage();
    await page.goto(req.query.link, {
      waitUntil: "networkidle0",
      // waitUntil: "load",
    });

    const productHandlers = await page.$$(
      "._8n-x > div._8n_0 > div._9ccv._9raa"
    );

    const ADList = [];
    for (let indexP = 0; indexP < productHandlers.length; indexP++) {
      const producthandle = productHandlers[indexP];
      let title = null;
      const tempObj = {};
      try {
        title = await page.evaluate(
          (el) =>
            el.querySelector(
              "div > div._9ccv._9raa > div > div._9guv._9rab > div > div > span"
            ).textContent,
          producthandle
        );
        tempObj.title = title;
        const contentHandlers = await page.$$("div > div._9cb_", producthandle);
        const contentArr = [];
        const element = contentHandlers[indexP];
        let ids = [];
        let status = [];
        try {
          ids = await element.$$eval(
            "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > div.o0aczdgd > div > span",
            (idsEle) => {
              return idsEle.map((idEl) => idEl.textContent);
            }
          );
        } catch (error) {}
        try {
          status = await element.$$eval(
            "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j",
            (statusEle) => {
              return statusEle.map((statusEl) => statusEl.textContent);
            }
          );
        } catch (error) {}
        for (let index = 0; index < ids.length; index++) {
          const element = ids[index];
          const content = { id: element.split(" ")[1], status: status[index] };
          contentArr.push(content);
        }
        tempObj.content = contentArr;
        ADList.push({ ...tempObj });
      } catch (error) {}
    }

    await page.screenshot({
      path: "ss.png",
      fullPage: true,
    });
    // await page.emulateMediaType("screen");
    // await page.pdf({ path: "page.pdf" });
    if (headless) await page.pdf({ path: "capture.pdf", format: "A0" });

    // await browser.close();
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
    const headless = false;
    //  Browser Configuration to launch site
    const browser = await puppeteer.launch({
      headless, // To display actions
      devtools: true, // To enable devtools
      defaultViewport: false, // To set screen size in launch
      // userDataDir: "./temp", // To caputure the caches
      // executablePath:
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default
    });

    // Rendering Page
    const page = await browser.newPage();
    await page.goto(req.query.link, {
      waitUntil: "networkidle0",
      // waitUntil: "load",
    });

    await page.type("#fullname", "John Showme");
    await page.type("#email", "johnshowme@alo2.com");
    await page.screenshot({
      path: "formFill.png",
      fullPage: true,
    });

    await Promise.all([
      page.waitForNavigation(),
      page.click("#_form_5_submit"),
    ]);

    // if (headless) await page.pdf({ path: "form.pdf", format: "A0" });
    await page.screenshot({
      path: "form.png",
      fullPage: true,
    });
    return res.status(OK).json({
      data: "Success",
      code: OK,
      message: RECORD_FOUND,
    });
  } catch (error) {
    return next(error);
  }
};
