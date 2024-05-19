/** @format */

import * as Router from "koa-router";

const router = new Router();

router.get("/api/teapot", async (ctx, next) => {
    ctx.type = "application/json";
    ctx.status = 418;
    ctx.body = { msg: "418 I'm a teapot" };
    await next();
});

const teapotRoutes = router.routes();

export default teapotRoutes;
