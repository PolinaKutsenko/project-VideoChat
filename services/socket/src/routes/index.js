import { Router } from '../services/socket/router.js';
import { userRouter } from './root/user/router.js';
import { messageRouter } from './root/message/router.js';
import { videoChatRouter } from './root/videochat/router.js';
import { disconnectRouter } from './root/disconnect/router.js';

const router = new Router();

router.addRouter('user', userRouter);
router.addRouter('message', messageRouter);
router.addRouter('videochat', videoChatRouter);
router.addRouter('disconnect', disconnectRouter);
export const rootRouter = router;
