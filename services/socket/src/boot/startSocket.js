import { vars } from '../config/vars.js';
import { io } from '../config/socket.js';
import { logger } from '../config/logger.js';

export const startSocket = () => {
    logger.info('socket:running:start');
    io.listen(vars.port);
    logger.info(`socket:running:complete; started on port: ${vars.port}`);
};
