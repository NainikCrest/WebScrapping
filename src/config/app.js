/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.expressAppConfiguration
 * @description Express App setup with all routes and database configuration. App basic configuration.
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const express = require("express");
const app = express();
const path = require("path");
const compress = require("compression");
const APIError = require("../helpers/apiError");
const {
  ValidationErrorHandler,
  ErrorHandler,
} = require("../helpers/errorHandler");

const cors = require("cors");
const helmet = require("helmet");
var morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { logType, morganConfig } = require("./envVars");

// Parse JSON playload
app.use(express.json({}));
// Parse URl-Encoded Data
app.use(express.urlencoded({ extended: true }));

// Compressing Request Middleware
app.use(compress());

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
// Morgan logging for api request in development & production
app.use(morgan(logType, morganConfig));
// Allowimg CORS
app.use(cors());
app.options("*", cors());

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// Make Public folder static
app.use(express.static(path.join(__dirname, "../public")));

// Routes - /v1
app.use("/api/v1", require("../api/routes/"));

// Global Error Handler
app.use(ValidationErrorHandler);
app.use(ErrorHandler);

// Throw Path NOT FOUND
app.all("*", (req, res, next) => {
  const ApiError = new APIError(
    `Can't find ${req.originalUrl} on this server!`,
    null,
    404
  );
  return ErrorHandler(ApiError, req, res, next);
});

module.exports = app;
