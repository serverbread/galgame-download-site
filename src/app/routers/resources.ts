/** @format */

import * as Router from "koa-router";
import * as mime from "mime-types";
import * as fs from "fs";
import * as path from "path";
import logger from "../../utils/log";
import { resourceDirectory } from "../../conf/resourcePath";

const router = new Router();

// 仅仅是get一下
router.get(new RegExp("/resources/*"), async (ctx, next) => {
    const resourcePath = ctx.path.substring("/resources/".length);
    const filename = path.basename(resourcePath);
    const args = ctx.query;
    /* 这个args可以有以下几个参数：
     * download: boolean   是否下载此文件
     * filename: string    下载时显示的文件名
     * text: boolean       是否以文本形式显示
     */

    // 判断文件是否存在
    logger.debug(path.join(resourceDirectory, resourcePath));
    if (!fs.existsSync(path.join(resourceDirectory, resourcePath))) {
        ctx.status = 404;
        ctx.type = "text/plain";
        ctx.body = "404 Not Found";
        logger.debug("文件不存在");
        await next();
        return;
    }

    // 判断文件类型并设置content-type
    let contentType = mime.lookup(resourcePath);
    // 如果这拓展名很几把怪，就直接丢这个死人content-type
    logger.debug("content-type:" + String(contentType));
    if (!contentType) {
        contentType = "application/octet-stream";
    }
    ctx.type = contentType;

    // 解析参数并执行相应操作
    if (args.download && args.text) {
        ctx.status = 403;
        ctx.type = "text/plain";
        ctx.body = "403 Forbidden";
    } else if (args.download) {
        // 判断是否下载
        ctx.set(
            "Content-Disposition",
            `attachment; filename=${args.filename ? args.filename : filename}`
        );
    } else if (args.text) {
        // 判断是否为文本
        ctx.type = "text/plain";
    }



    // 准备传输
    // 判断文件大小是否大于1KB
    const filePath = path.join(resourceDirectory, resourcePath);
    const fileStat = fs.statSync(filePath);
    ctx.length = fileStat.size; // 设置文件的大小，让用户可以看到下载剩余时长。
    if (fileStat.size >= 1024) {
        logger.debug("流式传输");
        ctx.body = fs.createReadStream(filePath);
    } else {
        logger.debug("一口气全jb传输过去");
        ctx.body = fs.readFileSync(filePath);
    }
    await next();
});

const resourcesRoutes = router.routes();

export default resourcesRoutes;
