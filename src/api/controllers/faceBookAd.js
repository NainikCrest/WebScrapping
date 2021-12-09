const { RECORD_FOUND, OK } = require("../../helpers/constants");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

/**
 * @api {post} /user/register
 * @apiDescription Creates a user
 * @apiGroup Auth / User
 *
 * @apiSuccess (200) {Object} data the created user
 * @apiPermission Any
 * @apiVersion 1.0.0 (/api/v1/)
 */
exports.faceBookAd = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    // await page.goto("https://learnwebcode.github.io/practice-requests/");
    await page.goto(req.query.link, { waitUntil: "networkidle0" });
    // await Promise.all([page.waitForNavigation()]);

    // const info = await page.$eval("#o0aczdgd > span", (el) => el.textContent);
    // console.log(info);

    const AdIds = await page.$$eval(
      "div._9cb_ > div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div.m8urbbhe.fv962s72 > div.o0aczdgd > div.rxo4gu2c.fij28k4b > span",
      (span) => {
        return span.map((span) => span.innerHTML);
      }
    );

    await fs.writeFile("AdIds.txt", AdIds.join("\r\n"));
    // const photos = await page.$$eval(
    //   "div._9cb_ > div > div > div > div > div > div > a > div > img",
    //   (imgs) => {
    //     return imgs.map((img) => img.src);
    //   }
    // );
    // //
    // const names = await page.evaluate(() => {
    //   return Array.from(
    //     document.querySelectorAll(".rxo4gu2c fij28k4b > span")
    //   ).map((x) => x.textContent);
    // });

    // await fs.writeFile("names.txt", names.join("\r\n"));
    // console.log(names);
    // await page.screenshot({
    //   path: "ss.png",
    //   fullPage: true,
    // });

    await browser.close();
    return res.status(OK).json({
      data: {},
      code: OK,
      message: RECORD_FOUND,
    });
  } catch (error) {
    return next(error);
  }
};
