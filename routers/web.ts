/** @format */
/*
    根据url提供网页的路由。
*/
import express, { Router } from "express";
import { Logger } from "log4js";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import marked from "marked";

const logger: Logger = require("../logger.ts");

const router: Router = express.Router();

router.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (req.method !== "GET") {
        next();
        return;
    }
    const reqPath = decodeURIComponent(req.url).split("?")[0];
    if (reqPath === "/favicon.ico") {
        res.setHeader("Content-Type", "image/x-icon");
        res.end(fs.readFileSync("favicon.ico"));
        return;
    }
    if (fs.existsSync(path.join("./content", reqPath))) {
        const html: string = fs.readFileSync(
            "resources/html/universe.html",
            "utf8"
        );
        const content: string = fs
            .readFileSync(path.join("./content", reqPath))
            .toString();
        res.end(html.replace("%REPLACE%", marked.parse(content) as string));
        return;
    }

    next();
    return;
});

module.exports = router;
