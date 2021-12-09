/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.apiErrorGenerator
 * @description Generate API error's for various failed cases with proper error messages and error stacks.
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const { INTERNAL_SERVER_ERROR } = require("./constants");

// API Error Response Structure
class APIError extends Error {
  constructor(message, errors = [], statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.status = statusCode;
  }
}

module.exports = APIError;
