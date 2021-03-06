const app = require("express").Router();
const controller = require("../controllers/faceBookAd");

/**
 * @Route -> Initial FaceBook links
 *
 * @model app.facebook AD'S
 * @alias FaceBook AD's
 *
 * @api {get} /faceBookAd/
 * @apiVersion 1.0.0 (/api/v1/)
 */
app.route("/").get(controller.faceBookAd);

/**
 * @Route -> FaceBook ADs form 
 *
 * @model app.facebook AD'S
 * @alias FaceBook AD's
 *
 * @api {get} /faceBookAd/form
 * @apiVersion 1.0.0 (/api/v1/)
 */
app.route("/form").get(controller.faceBookAdForm);

module.exports = app;
