/** @format */

require("./init.ts")(); // 初始化

import express, { Application } from "express";
//import spdy, { Server, ServerOptions } from "spdy";
import http, { Server } from "node:http";
import { Logger } from "log4js";
import fs from "node:fs";
import bodyParser from "body-parser";
//import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const logger: Logger = require("./logger.ts");

const config: any = require("./config.ts"); // load config
logger.log(config);

const app: Application = express();

// 打印欢迎消息
const packageInf = JSON.parse(fs.readFileSync("./package.json").toString());
const welcomeMsg: string = `
${fs.readFileSync("logo.txt")}
@Author: ${packageInf.author}
@Version: v${packageInf.version}
`;
// 🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞
console.log(welcomeMsg);

// 中间件
app.use(require("./log.ts"));

// 路由放在这里

app.use(require("./routers/redirect.ts"));
app.use(require("./routers/api.ts"));
//app.use(require("./routers/users"));
app.use(require("./routers/resources.ts"));
app.use(require("./routers/web.ts"));

// 404处理
app.use((req, res, next) => {
    const html = fs.readFileSync("resources/html/404.html", "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(404).end(html);
    return;
});

async function bootstrap() {
    const httpServer: Server = http.createServer(app);
    httpServer.listen(config.port, () => {
        logger.log("http服务器已启动！");
    });
}

bootstrap();
