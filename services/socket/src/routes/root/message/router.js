import { Router } from '../../../services/socket/router.js';
import * as controller from './controller.js';

const router = new Router();

router.addRoute(
    { path: 'Add' },
    controller.add,
);

router.addRoute(
    { path: 'Get' },
    controller.get,
);

export const messageRouter = router;