/** @format */

import * as Router from "koa-router";

const router = new Router();

router.get("/api/user/", async (ctx, next) => {
    ctx.type = "application/json";
    ctx.body = { msg: "Hello World!" };
    await next();
});

const userRoutes = router.routes();

export default userRoutes;
