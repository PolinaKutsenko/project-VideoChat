import { rootRouter } from '../../routes/index.js';
import { logger } from '../../config/logger.js';

export const onConnection = (socket) => {
    logger.info(`socket:connected; ${socket.id}`);
    rootRouter.subscribe(socket);
};
