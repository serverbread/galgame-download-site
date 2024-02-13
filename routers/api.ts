/** @format */
/*
    提供api的路由。
*/
import express, { Router } from "express";
import { Logger } from "log4js";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import marked from "marked";

const logger: Logger = require("../logger.ts");

const router: Router = express.Router();

router.get("/api/content/*", (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const reqPath = decodeURIComponent(req.url).split("?")[0];
    const args = decodeURIComponent(req.url).split("?")[1];

    let reqData: any = {
        error: false,
    };

    const fileName = path.parse(reqPath.replace("/", "")).base;

    if (!fs.existsSync(path.join("./content", fileName))) {
        reqData.error = true;
        reqData.message = `找不到：${fileName}`;
        res.status(400).end(JSON.stringify(reqData));
        return;
    }

    reqData.content = marked.parse(
        fs.readFileSync(path.join("./content", fileName)).toString()
    );
    setTimeout(() => {
        res.end(JSON.stringify(reqData));
    }, 3000)
    

    return;
});

module.exports = router;
