import { Router } from '../../../services/socket/router.js';
import * as controller from './controller.js';

const router = new Router();

router.addRoute(
    { path: '' },
    controller.disconnect,
);

export const disconnectRouter = router;