import { Router } from '../../../services/socket/router.js';
import * as controller from './controller.js';

const router = new Router();

router.addRoute(
    { path: 'GetToken' },
    controller.getToken,
);

export const videoChatRouter = router;
