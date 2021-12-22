/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.envVariablesConfig
 * @description Getting all ENV variables
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

// Morgan configuration for production environment
const MorganProd = {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
  stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
  }),
};

// Setting Environment variables
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  crawlDir: process.env.DIR_NAME,
  Level: process.env.NODE_ENV === "development" ? "debug" : "error", // logging priority for development & production
  logType: process.env.NODE_ENV === "development" ? "dev" : "combined", // Morgan logger for development & production
  morganConfig: process.env.NODE_ENV === "development" ? {} : MorganProd, // Morgan Config for development & production
};
