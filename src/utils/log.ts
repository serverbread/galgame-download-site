/** @format */

import * as log4js from "log4js";
import { Logger } from "log4js";

log4js.configure({
    appenders: { out: { type: "stdout" } },
    categories: { default: { appenders: ["out"], level: "debug" } },
});

const logger: Logger = log4js.getLogger();

logger.level = "debug";

export default logger;
