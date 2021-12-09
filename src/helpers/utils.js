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
