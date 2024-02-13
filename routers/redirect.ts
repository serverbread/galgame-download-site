/** @format */
/*
    根据redirect.yml文件内容进行重定向的路由。
*/
import express, { Router } from "express";

import fs from "fs";
import YAML from "yaml";

const router: Router = express.Router();

router.use((req, res, next) => {
    if (req.method !== "GET") {
        next();
        return;
    }
    const redirection: any = YAML.parse(
        fs.readFileSync("routers/redirect.yml").toString()
    );
    const reqPath: string = decodeURIComponent(req.url).split("?")[0];

    for (let i in redirection) {
        if (reqPath === i) {
            res.writeHead(301, { Location: redirection[i] }).end();
            return;
        }
    }
    next();
    return;
});

module.exports = router;
