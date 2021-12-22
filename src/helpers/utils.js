/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.utilsHelper
 * @description Reusable functions which can be used throughout the App.
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const APIError = require("./apiError");
const { Cluster } = require('puppeteer-cluster');
const { BAD_REQUEST, DUPLICATE_ERROR } = require("./constants");
const fs = require('fs');

exports.checkDuplication = async (data, model) => {
  if (data.name === "SequelizeUniqueConstraintError") {
    const errorObj = { ...data.errors[0] };
    const errors = [
      {
        field: errorObj.path,
        location: model,
        message: `${errorObj.value} is already added in ${model}!`,
      },
    ];
    var arr = new APIError(DUPLICATE_ERROR, errors, BAD_REQUEST);
    return arr;
  }
};

exports.omitter = (keys, obj) => {
  if (!keys.length) return obj;
  const { [keys.pop()]: omitted, ...rest } = obj;
  return this.omitter(keys, rest);
};

exports.slugifyURL = (URL) => {
  return URL.replace(/[\/:?&]/g, '_');
};

exports.createDirSync = (dirPath) => {
  try {
    dirPath.split('/').reduce((parentPath, dirName) => {
      const currentPath = parentPath + dirName;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
      return currentPath + '/';
    }, '');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};

exports.autoScroll = async (page) => {
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


exports.clusterForm = async (urls) => {
  const resList = [];
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 100,
    monitor: true,
    puppeteerOptions: {
      // pipe: true, // Connects to the browser over a pipe instead of a WebSocket. Defaults to false
      devtools: false, // Whether to auto-open a DevTools panel for each tab. If this option is true, the headless option will be set false
      headless: false, // Whether to run browser in headless mode. Defaults to true unless the devtools option is trues
      timeout: 0, // Maximum time in milliseconds to wait for the browser instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      defaultViewport: false, // To set screen size in launch
      userDataDir: "./cache", // To download the caches
      // executablePath:
      //   // "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // To execute the link in given path instead of chromiun as default,
      // Path to a browser executable to run instead of the bundled Chromium.
      // args: [
      //   "--start-maximized",
      //   // `--proxy-server=${tempHost.host}:${tempHost.port}`,
      //   "--no-sandbox",
      //   "--disable-setuid-sandbox",
      //   "--disable-dev-shm-usage",
      //   "--disable-gpu",
      // ], // Additional arguments to pass to the browser instance
    }
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url, {
      timeout: 0, // Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
      waitUntil: ["networkidle0", "load", "networkidle2", "domcontentloaded"], // <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array>
    });

    await page.type("#fullname", req.query.name, { delay: 100 });
    await page.type("#email", req.query.email, { delay: 100 });

    await Promise.all([
      page.waitForNavigation({
        waitUntil: "load",
        timeout: 0
      }),
      page.click("#_form_5_submit"),
    ]);

    // await page.screenshot({
    //   path: "FormResult.png",
    //   fullPage: true,
    // });
    resList.push("Success")

    // await Promise.all([await page.close()]);
  });
  for (const url of urls) {
    cluster.queue(url);
  }
}