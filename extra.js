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
