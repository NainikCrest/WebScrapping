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
          } catch (error) { }
          try {
            status = await element.$$eval(
              "div > div > div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div > span.qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j",
              (imgs) => {
                return imgs.map((img) => img.textContent);
              }
            );
          } catch (error) { }
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
      } catch (error) { }
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

async function getData() {
  const response = await fetch(
    "https://www.facebook.com/ads/library/async/search_ads/?forward_cursor=AQHRwI_67Fa9T2W9pPypQtMGB2o3_xXPjVv9NaZ5mFhY0gRJvheE7WdXcyhRYFySriZt&session_id=f4bf5d48-489c-44d3-aea8-686303d9e968&collation_token=7279be42-34f5-4674-b83b-186ded913914&count=22&active_status=all&ad_type=all&countries[0]=US&view_all_page_id=2262210287122770&media_type=all&search_type=page",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-fb-lsd": "AVrP_pDYIC4",
        cookie:
          "datr=VtqtYdxzncITnkRUFlPKBqlo; sb=UQuvYa67_bfD0nUFW9wVVp_G; usida=eyJ2ZXIiOjEsImlkIjoiQXI0MXBpZTFpZ2Nzam4iLCJ0aW1lIjoxNjM5Mzg0OTM0fQ%3D%3D; dpr=1; fr=007FnIBNyEAapEDM4..BhpK8e.9Y.AAA.0.0.BhuJ2s.AWX5qkrKWiY; wd=859x937",
        Referer:
          "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=2262210287122770&search_type=page&media_type=all",
        "Referrer-Policy": "origin-when-cross-origin",
      },
      body: "__user=0&__a=1&__dyn=7xeUmBz8fXgydwn8K2WnFwRwCwgE98nwgU6C4UKewSAwHxW4E7SezobohwVwgU2lwUx60Vo1upEK12wcG0KEswIwuo662y11xmfz81sbzo5-1ywXwsU9k2C2218wc61uBxi2a48O0zE-7E5i3e4U3mxOu2S2W2K7o721uwa-58G2q0gq2S3qazo11E&__csr=&__req=8&__hs=18976.BP%3ADEFAULT.2.0.0.0.&dpr=1&__ccg=MODERATE&__rev=1004867794&__s=ugjivd%3A1dic7o%3As6f1ms&__hsi=7041795773567997401-0&__comet_req=0&lsd=AVrP_pDYIC4&jazoest=2901&__spin_r=1004867794&__spin_b=trunk&__spin_t=1639545842&__jssesw=1",
      method: "POST",
    }
  );
  const data = response.json();
  console.log(data);
}

const fetch = require("isomorphic-fetch");

async function app() {
  try {
    const resp = await fetch(
      "https://www.facebook.com/ads/library/async/search_ads/?forward_cursor=AQHRWM5IzyUKbnkVvzVz-hlifrpHso4xfgNwH9wx31k3WivN4vPbweutyjm2xo3q0X-M&session_id=a3cf2515-7c6b-4357-81ea-ff94f3d7b4d0&collation_token=9f9584ec-12b7-477b-9aec-ec9a5beca055&count=15&active_status=all&ad_type=all&countries[0]=US&view_all_page_id=2262210287122770&media_type=all&search_type=page",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          pragma: "no-cache",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "viewport-width": "1062",
          "x-fb-lsd": "AVqbxaAxfxM",
          cookie:
            "datr=VtqtYdxzncITnkRUFlPKBqlo; sb=UQuvYa67_bfD0nUFW9wVVp_G; usida=eyJ2ZXIiOjEsImlkIjoiQXI0MXBpZTFpZ2Nzam4iLCJ0aW1lIjoxNjM5Mzg0OTM0fQ%3D%3D; _fbp=fb.1.1639632674102.1418759187; locale=en_GB; dpr=1; fr=0pbWUoucFs72APMzI.AWVRUpkQkJ7uQ2RnJOAVi8niIbw.BhpK8e.9Y.AAA.0.0.BhvClf.AWUk3vAjFW0; wd=1062x937",
          Referer:
            "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=2262210287122770&search_type=page&media_type=all",
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: "__user=0&__a=1&__dyn=7xeUmBz8fXgydwn8K2WnFwRwCwgE98nwgU6C4UKewSAwHxW4E7SezobohwVwgU2lwUx60Vo1upEK12wcG0KEswIwuo662y11xmfz81sbzo5-1ywXwsU9k2C2218wc61uBxi2a48O0zE-7E5i3e4U3mxOu2S2W2K7o721uwa-58G2q0gq2S3qazo11E&__csr=&__req=5&__hs=18978.BP%3ADEFAULT.2.0.0.0.&dpr=1&__ccg=EXCELLENT&__rev=1004885452&__s=v5e1zy%3Apctx4o%3A6b4lee&__hsi=7042561633556144849-0&__comet_req=0&lsd=AVqbxaAxfxM&jazoest=21063&__spin_r=1004885452&__spin_b=trunk&__spin_t=1639724158&__jssesw=1",
        method: "POST",
      }
    );
    console.log(resp.body);
    const dataParse = resp.replace("for (;;);", "");
    const data = await dataParse.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

app();



// const page2 = await browser.newPage();

// await Promise.all([
//   page2.goto(form_url, {
//     timeout: 0, // Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
//     waitUntil: ["networkidle0", "load", "networkidle2", "domcontentloaded"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
//   }),       // go to github.com 
//   page2.bringToFront()
// ]);


// await page2.screenshot({
//   path: "Form.png",
//   fullPage: true,
// });
// await page2.type("#fullname", req.query.name, { delay: 100 });
// await page2.type("#email", req.query.email, { delay: 100 });

// await page2.screenshot({
//   path: "FormFill.png",
//   fullPage: true,
// });

// await Promise.all([
//   page2.waitForNavigation(),
//   page2.click("#_form_5_submit"),
// ]);

// await page2.screenshot({
//   path: "FormResult.png",
//   fullPage: true,
// });

// await Promise.all([await page2.close()]);



/**
 * @api {get} /faceBookAd/
 * @apiDescription Get Facebook Ad's List Data
 * @apiGroup facebookAd /
 *
 * @apiSuccess (200) {Object} data Of Facebook Ad Page
 * @apiPermission Any
 * @apiVersion 1.0.0 (/api/v1/)
 */
exports.faceBookAdT = async (req, res, next) => {

  try {

    const { link, form_count } = req.query
    let tempNum = 0;
    let max_count = Number(form_count) || 1
    let formURLs = []

    //  Browser Configuration to launch site
    // const tempHost = getHost();
    // console.log(tempHost);
    const browser = await puppeteer.launch({
      pipe: true, // Connects to the browser over a pipe instead of a WebSocket. Defaults to false
      devtools: false, // Whether to auto-open a DevTools panel for each tab. If this option is true, the headless option will be set false
      headless, // Whether to run browser in headless mode. Defaults to true unless the devtools option is trues
      timeout: 0, // Maximum time in milliseconds to wait for the browser instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      defaultViewport: false, // To set screen size in launch
      userDataDir: "./cache", // To download the caches
      // executablePath:
      //   // "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default,
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
    await page.goto(link, {
      timeout: 0, // Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
      waitUntil: ["networkidle0", "load", "networkidle2", "domcontentloaded"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
    });

    // Enabling request interception disables page caching.
    page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {

      if (
        interceptedRequest.url().endsWith(".png") ||
        interceptedRequest.url().endsWith(".jpeg") ||
        interceptedRequest.url().endsWith(".jpeg") ||
        interceptedRequest.url().startsWith("https://video.fstv2") ||
        interceptedRequest.url().startsWith("https://scontent.fstv4")
      ) {
        interceptedRequest.abort();
      }
      else {
        interceptedRequest.continue();
      }
    });

    await autoScroll(page)
    // Wrapping/Finding up the AD Element
    const productHandlers = await page.$$(
      "._9ccv._9raa", options => options.map(option => option.innerHTML));

    const ADList = []

    for (let index = 0; index < productHandlers.length; index++) {
      if (tempNum === max_count) break; // Break when AD count matches
      const element = productHandlers[index];

      let title, ADHandlers = [];

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

      let subADList = [];

      // Iterating AD according to year
      for (let indexJ = 0; indexJ < ADHandlers.length; indexJ++) {
        if (tempNum === max_count) break; // Break when AD count matches
        const ADelement = ADHandlers[indexJ];

        let status, id, start_running, multiple_version, ad_uses, video_url, form_url, html_details;
        // 
        // Getting AD status
        try {
          status = await ADelement.$eval(
            ".qku1pbnj.jdeypxg0.gr1kmz5o.and5a8ls.te7ihjl9.svz86pwt.a53abz89.nxqif72j", (node) => {
              return node.innerText;
            });
        } catch (error) { status = null; }

        try {
          start_running = await ADelement.$eval(
            "div.jdijf8jp.i0ppjblf.jvozsxb1.mqteepqw.b8ykynyv.egkesoaz.qi2u98y8 > div > div.a53abz89.rgsc13q7.rwb8dzxj.hv94jbsx > div:nth-child(2) > span", (node) => {
              return node.innerText;
            });
        } catch (error) { start_running = null; }

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

        // Getting AD uses data 
        try {
          ad_uses = await ADelement.$eval(
            "div._9b9y > span.qku1pbnj.j8otv06s.r05nras9.a1itoznt.te7ihjl9.svz86pwt.a53abz89", (node) => {
              return node.innerText;
            });
        } catch (error) { ad_uses = null; }

        // Getting AD Video URL
        try {
          video_url = await ADelement.$eval(
            "div._8o0a._8o0b > video", (node) => {
              return node.src;
            });
        } catch (error) { video_url = null; }

        // Getting AD FORM URL
        try {
          form_url = await ADelement.$eval(
            "a.d5rc5kzv.chuaj5k6.qku1pbnj.j8otv06s.a1itoznt.fvlrrmdj.svz86pwt.aa8h9o0m.jrvjs1jy.jrkk970q", (node) => {
              return node.href;
            });
        } catch (error) { form_url = null; }

        // Getting AD HTML Details
        try {
          html_details = await ADelement.$eval(
            "div._7jyr._a25- > span > div > div._4ik4._4ik5", (node) => {
              return node.innerHTML;
            });
        } catch (error) { html_details = null; }

        subADList.push({ id, start_running, multiple_version, ad_uses, video_url, form_url, status, html_details });
        formURLs.push(form_url)

        tempNum++
      }

      ADList.push({ title, subADList, count: subADList.length });
    }

    await page.screenshot({
      path: "FacebookAD.jpeg", // The file path to save the image to.
      quality: 100, //The quality of the image, between 0-100. Not applicable to png images
      fullPage: true, // When true, takes a screenshot of the full scrollable page. Defaults to false.
    });

    await page.emulateMediaType("screen");
    if (headless) await page.pdf({ path: "page.pdf" });
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
