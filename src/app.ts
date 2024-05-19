/** @format */

import * as Koa from "koa";
import { Context, Next } from "koa";
import userRoutes from "./app/routers/api/user";
import resourcesRoutes from "./app/routers/resources";
import teapotRoutes from "./app/routers/api/teapot";
import logger from "./utils/log";
import "colors";

const app = new Koa();

const port = 8000;

// 记录访问日志
app.use(async (ctx: Context, next: Next) => {
    logger.log(
        `${ctx.ip.blue} ${ctx.method.red} ${
            decodeURIComponent(ctx.protocol + "://" + ctx.host + ctx.url).yellow
        }`
    );
    await next();
});

// routes
app.use(userRoutes);
app.use(resourcesRoutes);
app.use(teapotRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
