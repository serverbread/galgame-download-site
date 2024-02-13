/** @format */

"use strict";

import express, { Router } from "express";
import { Logger } from "log4js";
import fs from "fs";
import path, { ParsedPath } from "node:path";

const logger: Logger = require("../logger.ts");

const router: Router = express.Router();

router.use((req, res, next) => {
    // 设置缓存
    

    const reqPath: string = decodeURIComponent(req.url).split("?")[0];

    const localParsedPath: ParsedPath = path.parse(reqPath.replace("/", ""));

    if (localParsedPath.dir.indexOf("resources") !== 0) {
        // 如果resources不是处于最开头的位置的话
        next();
        return;
    }

    const contentTypeList: any = require("../contentType.json");
    let contentType: string = contentTypeList[localParsedPath.ext]
        // 如果拓展名是未知的话
    if (contentType) {
        res.setHeader("Content-Type", `${contentType}; charset=utf-8`);
    }

    //logger.info(localParsedPath);
    const localPath: string = path.join(localParsedPath.dir, localParsedPath.base)
    if (!fs.existsSync(localPath)) {
        logger.error(`找不到：${localPath}`);
        next();
        return;
    }

    if (fs.statSync(localPath).isDirectory()) {
        logger.error(`目标是目录：${localPath}`);
        next();
        return;
    }
    //next();
    res.setHeader("Cache-Control", "max-age=36000");
    res.end(fs.readFileSync(localPath));
    return;
    //next();

});

module.exports = router;
