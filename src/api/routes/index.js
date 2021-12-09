/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.routesExports
 * @description Export for all routes defined in the routes folder except current file
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const express = require("express");
const fs = require("fs");
const app = express.Router();

// Exporting all routes generally
module.exports = fs.readdirSync(__dirname + "/").forEach(function (file) {
  if (file !== "index.js" && file.substr(-3) == ".js") {
    const routeName = file.replace(".js", "");
    app.use("/" + routeName, require("./" + routeName));
  }
});

module.exports = app;
