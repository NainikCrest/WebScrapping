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
const { BAD_REQUEST, DUPLICATE_ERROR } = require("./constants");

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
