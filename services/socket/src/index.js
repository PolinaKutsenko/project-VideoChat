import process from 'process';

import { logger } from './config/logger.js';
import { runBootTasks } from './boot/index.js';

async function start() {
    await runBootTasks();
}

start().catch((e) => {
    logger.error(e.message);
    process.exit();
});
