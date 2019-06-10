import * as path from "path";
import { containerInversify } from "../inversify.config";
import { env } from "./env";
import { Logger } from "./lib/logger/Logger";
import server from "./server";

const port = process.env.PORT;

// TODO avoid insecure TLS connection
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

server.listen(port, (error) => {
    const logger: Logger = containerInversify.resolve<Logger>(Logger);
    if (error) {
        return logger.error(error);
    }
    logger.info(`server is listening on ${port} in ${env.node} mode`, path.basename(__filename));
});