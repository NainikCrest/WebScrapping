// const ADList = [];
// for (const producthandle of productHandlers) {
//   let title = null;
//   try {
//     title = await page.evaluate(
//       (el) =>
//         el.querySelector(
//           "div > div._9ccv._9raa > div > div._9guv._9rab > div > div > span"
//         ).textContent,
//       producthandle
//     );

//     const contentHandlers = await page.$$("div > div._9cb_", producthandle);
//     let contentArr = [];
//     for (let index = 0; index < contentHandlers.length; index++) {
//       const element = contentHandlers[index];
//       let ids = [];
//       let status = [];
//       try {
//         ids = await element.$$eval(
//           "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > div.o0aczdgd > div > span",
//           (imgs) => {
//             return imgs.map((img) => img.textContent);
//           }
//         );
//       } catch (error) {}
//       try {
//         status = await element.$$eval(
//           "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > span",
//           (imgs) => {
//             return imgs.map((img) => img.textContent);
//           }
//         );
//       } catch (error) {}
//       contentArr.push({ title, ids, status });
//     }
//     // ADList.push({ title, content: contentArr });
//     break;
//   } catch (error) {}
// }

// await fs.writeFile("names.txt", names.join("\r\n"));
// console.log(names);

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

// // Getting AD's Block Code
// const productHandlers = await page.$$(
//   "._8n-x > div._8n_0 > div._9ccv._9raa > div > div._9cb_ > div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx"
//   // "._8n-x > div > div > div > div._9cb_ > div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx"
// );

// // Loop through all handles
// for (const producthandle of productHandlers) {
//   try {
//     const singleHandle = await page.evaluate(
//       (el) => el.querySelector("div.rxo4gu2c.fij28k4b > span").innerHTML,
//       producthandle
//     );
//     console.log("SSINGLE HANDLE", singleHandle);
//   } catch (error) {}
// }

const { RECORD_FOUND, OK } = require("../../helpers/constants");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

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
    const browser = await puppeteer.launch({
      headless: false, // To display actions
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

    const productHandlers = await page.$$(
      "._8n-x > div._8n_0 > div._9ccv._9raa"
    );

    const ADList = [];
    for (const producthandle of productHandlers) {
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
        for (let index = 0; index < contentHandlers.length; index++) {
          const element = contentHandlers[index];
          let ids = [];
          let status = [];
          const content = {};
          try {
            ids = await element.$$eval(
              "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > div.o0aczdgd > div > span",
              (imgs) => {
                return imgs.map((img) => img.textContent);
              }
            );
          } catch (error) {}
          try {
            status = await element.$$eval(
              "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j",
              (imgs) => {
                return imgs.map((img) => img.textContent);
              }
            );
          } catch (error) {}
          // for (let index = 0; index < ids.length; index++) {
          //   const element = ids[index];
          //   content = { id: element, status: status[index] };
          //   contentArr.push(content);
          // }
          console.log("TTTTTTTTTTTTTT", tempObj, title, ids, status);
        }
        // console.log("TTTTTTTTTTTTTT", tempObj, title, ids);
        console.log(contentArr);
        // tempObj = { ...tempObj, content: contentArr };
        ADList.push({ ...tempObj });
      } catch (error) {}
    }

    await page.screenshot({
      path: "ss.png",
      fullPage: true,
    });

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
