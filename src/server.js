/**
 * This file is part of [Web Scrapping]
 *
 * (c) 2021 [Crest Infosystems] <[nainik.m@crestinfosystems.net]>
 *
 * --------------------------------------------------
 *
 * @module app.v1.serverSetupConfigurations
 * @description Setting up http or https server to listen on given port and initiating the database connection.
 * @author [Nainik Mehta] <[nainikmehta1999@gmail.com]>
 * @version 1.0.0
 *
 * --------------------------------------------------
 */

const http = require("http");
const app = require("./config/app");
const { env, port } = require("./config/envVars");
const logger = require("./config/logger");

//Create Express web Server
const server = http.createServer(app);
server.listen(port);

// On server Listening
server.on("listening", async () => {
  logger.info(`We're flying on ${`${env.toUpperCase()}_${port}`}`);
});

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = `Port ${port}`;
  switch (error.code) {
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
    case "ECONNREFUSED":
      logger.error(`Unable to connect with the database server`);
      process.exit(1);
    default:
      throw error;
  }
};

server.on("error", onError);
