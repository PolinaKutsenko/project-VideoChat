import { logger } from '../config/logger.js';
import { startSocket } from './startSocket.js';

export const runBootTasks = async () => {
    logger.info('BootTasks:running:start');
    await startSocket();
    logger.info('BootTasks:running:complete');
};
