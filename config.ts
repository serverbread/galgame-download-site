import fs from "fs";
import YAML from "yaml";

const configFile: Buffer = fs.readFileSync("./config.yml");
const config: object = YAML.parse(configFile.toString());

module.exports = config;