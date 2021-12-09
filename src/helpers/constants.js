/**
 * This file is part of [NODEJS BOILERPLATE]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.contantsApp
 * @description List of CONTANTS used throughout the APP to make tasks easy.
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

module.exports = {
  // HTTP Status Codes
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  MOVED_PERMANENTLY: 301,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Static Values
  AUTH_ROLES: ["User", "Admin"],
  LOGGED_IN: ["User", "Admin"],
  USER_STATUS: ["Active", "Deactive"],
  SYMPTOMS_GROUP: [
    "Cold",
    "Cough",
    "Sore throat",
    "Stomach pain",
    "Shortness of breath",
    "Redness in eyes",
    "Fever",
    "Toothache",
    "Nausea",
    "Itching",
    "Diarrhea",
  ],

  ADMIN: "Admin",

  COVID_AGE_GROUP: ["0 - 17", "18 - 35", "36 - 58", "59 - 70", "71 and above"],

  // Messages
  UNAUTHORIZE_ERROR: "Unauthorized! ",
  FORBIDDEN_ERROR: "Access Forbidden! ",
  NOT_REGISTER: "User is not registered!",
  INVALID_CREDENTIALS: "Invalid Credentials!",
  VALIDATION_ERROR: "Validation Error! Please check your inputs",
  DUPLICATE_ERROR: "Already exist!",
  RECORD_CREATED: "Record created successfully ",
  RECORD_UPDATED: "Record updated successfully ",
  RECORD_DELETED: "Record deleted successfully ",
  RECORD_FOUND: "Record fetched successfully",
  RECORDS_FOUND: "Records fetched successfully",
  NO_RECORD_FOUND: "No record found!",
  RECORD_NOT_EXIST: "Record does not exist!",
};
