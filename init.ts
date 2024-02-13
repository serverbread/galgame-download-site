/** @format */

import fs from "fs";
import YAML from "yaml";

module.exports = () => {
    // config file
    if (!fs.existsSync("config.yml")) {
        const defaultConfig: object = {
            port: 80,
            host: "localhost",
        };
        fs.writeFileSync("config.yml", YAML.stringify(defaultConfig));
    }

    // motd
    if (!fs.existsSync("logo.txt")) {
        const gsdStr = `

        `
        const logo = `
 ___________
|           | #
| ▞▀▖▞▀▖▛▀▖ | # Galgame Download Site
| ▌▄▖▚▄ ▌ ▌ | # Vanilla version
| ▌ ▌▖ ▌▌ ▌ | # @Repo: serverbread/galgame-download-site
| ▝▀ ▝▀ ▀▀  | # Have a good day!
|___________| #
        `;
        fs.writeFileSync("logo.txt", logo);
    }

    // redirect
    if (!fs.existsSync("routers/redirect.yml")) {
        let defaultRedirectJson: any = {
            "/": "/index.md",
        };
        fs.writeFileSync(
            "./routers/redirect.yml",
            YAML.stringify(defaultRedirectJson)
        );
    }

    //data directory
    if (!fs.existsSync("data")) {
        fs.mkdirSync("./data");
    }
};
