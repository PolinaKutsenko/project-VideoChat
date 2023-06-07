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

router.addRoute(
    { path: 'Remove' },
    controller.remove,
);

router.addRoute(
    { path: 'Login' },
    controller.login,
);

export const userRouter = router;
