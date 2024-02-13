/** @format */

import express, { Application } from "express";
import { Logger } from "log4js";

const logger: Logger = require("./logger.ts");

const app: Application = express();

app.use((req, res, next) => {
    const ip = req.ip;
    const url = decodeURIComponent(req.url);
    logger.debug(`${ip} ${req.method} ${url}`);
    next();
    return;
});

module.exports = app;